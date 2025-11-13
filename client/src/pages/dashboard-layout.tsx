import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/lib/useAuth";
import AdminDashboard from "@/pages/admin-dashboard";
import MerchantDashboard from "@/pages/merchant-dashboard";

export default function DashboardLayout() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar navigation */}
        <AppSidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b bg-card">
            <SidebarTrigger />
            <div className="text-sm text-muted-foreground">
              {user ? `Welcome back, ${user.email}` : "Not signed in"}
            </div>
          </header>

          {/* Role-specific dashboard content */}
          <main className="flex-1 overflow-y-auto p-6">
            {role === "admin" && <AdminDashboard />}
            {role === "merchant" && <MerchantDashboard />}
            {!role && <p>Please sign in to view your dashboard.</p>}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
