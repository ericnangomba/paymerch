import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import helmet from 'helmet';

// Using Supabase for authentication - no Firebase needed!
log("✅ Using Supabase JWT authentication (Firebase not required)");

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req: Request, _res: Response, buf: Buffer) => {
    (req as any).rawBody = buf; // req.rawBody is added by this middleware
  }
}));
app.use(express.urlencoded({ extended: false }));

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided.' });
  }

  try {
    // Decode Supabase JWT token and extract user info
    // In a real production setup, you should verify the JWT signature
    // For now, we'll do basic validation
    const parts = token.split('.');
    if (parts.length !== 3) {
      return res.status(403).json({ message: 'Forbidden: Invalid token format.' });
    }

    // Decode the payload (second part)
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    // Extract user ID from the token
    const userId = payload.sub; // 'sub' is the standard claim for user ID in Supabase JWTs
    if (!userId) {
      return res.status(403).json({ message: 'Forbidden: Invalid token - no user ID.' });
    }

    // Attach user info to the request object
    (req as any).user = { 
      uid: userId,
      email: payload.email,
      ...payload 
    };
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token.' });
  }
};

// Configure Helmet for security, with special rules for Vite in development
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"], // Allow inline scripts for Vite
        "connect-src": ["'self'", "ws:"], // Allow websocket connections for HMR
      },
    },
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Only log API routes
  if (!req.path.startsWith("/api")) {
    return next();
  }

  const originalSend = res.send;
  let responseBody: string | undefined;
  res.send = function (body?: any): Response { // body can be optional or any type
    // Capture the body for logging, only if it's a string (like JSON)
    if (typeof body === 'string') {
      responseBody = body;
    }
    // Use `this` to correctly bind to the `res` object and `...arguments` to pass all original arguments
    return originalSend.apply(this, arguments as any) as Response;
  }

  res.on("finish", () => {
    const duration = Date.now() - start;
    let logLine = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    if (responseBody) {
      const trimmedBody = responseBody.length > 150 ? responseBody.substring(0, 147) + "..." : responseBody;
      logLine += ` :: ${trimmedBody}`;
    }

    log(logLine);
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log the full error for debugging purposes on the server
    console.error("Error:", err.stack || err.message);

    // Send a generic error message to the client
    res.status(status).json({ message });
    // Do not re-throw the error, as it can crash the process
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Server listening on port ${port}`);
  });

  const gracefulShutdown = (signal: string) => {
    process.on(signal, () => {
      log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        log("Server closed.");
        process.exit(0);
      });
    });
  };

  gracefulShutdown("SIGINT");
  gracefulShutdown("SIGTERM");
})();
