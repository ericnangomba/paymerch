import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Route, Switch } from "wouter";
import Dashboard from "./dashboard";
import Transactions from "./transactions";
import PaymentLinks from "./payment-links";
import Analytics from "./analytics";
import Payouts from "./payouts";

export default function DashboardLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Switch>
              <Route path="/dashboard/transactions" component={Transactions} />
              <Route path="/dashboard/payment-links" component={PaymentLinks} />
              <Route path="/dashboard/analytics" component={Analytics} />
              <Route path="/dashboard/payouts" component={Payouts} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
