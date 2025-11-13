import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import DashboardLayout from "@/pages/dashboard-layout";
import Checkout from "@/pages/checkout";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/admin-dashboard";
import MerchantDashboard from "@/pages/merchant-dashboard";
import { useAuth } from "@/lib/useAuth";
import { Redirect } from "wouter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/admin" component={Admin} />
      <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} role="admin" />
      <ProtectedRoute path="/merchant-dashboard" component={MerchantDashboard} role="merchant" />
      <Route path="/checkout/:linkId" component={Checkout} />
      <Route path="/dashboard" component={DashboardLayout} />
      <Route path="/dashboard/:rest*" component={DashboardLayout} />
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

function ProtectedRoute({ component: Component, role, ...rest }: { component: React.ComponentType; role: string; [key: string]: any }) {
  const { user } = useAuth();

  console.log('ProtectedRoute: user role =', user?.role, 'expected role =', role);

  if (!user || user.role !== role) {
    return <Redirect to="/signin" />;
  }

  return <Component {...rest} />;
}

export default App;
