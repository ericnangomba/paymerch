import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import Checkout from "@/pages/checkout";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/admin-dashboard";
import MerchantDashboard from "@/pages/merchant-dashboard";
import AdminGuard from "@/components/AdminGuard";
import MerchantGuard from "@/components/MerchantGuard"; // ✅ new guard
import Unauthorized from "@/pages/Unauthorized";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/unauthorized" component={Unauthorized} />

      {/* Admin Dashboard guarded */}
      <Route path="/admin">
        <AdminGuard>
          <AdminDashboard />
        </AdminGuard>
      </Route>

      {/* Merchant Dashboard guarded */}
      <Route path="/merchant">
        <MerchantGuard>
          <MerchantDashboard />
        </MerchantGuard>
      </Route>

      {/* Checkout links */}
      <Route path="/checkout/:linkId" component={Checkout} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
