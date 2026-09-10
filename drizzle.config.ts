import { defineConfig } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Add your Neon connection string to the .env file.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./server/storage.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
