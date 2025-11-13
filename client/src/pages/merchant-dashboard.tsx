import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

interface MerchantOverview {
  totalRevenue: number;
  totalBalance: number;
  totalTransactions: number;
  successRate: number;
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
}

export default function MerchantDashboard() {
  const { user, logout } = useAuth();
  const [overview, setOverview] = useState<MerchantOverview | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const role = user?.role?.toLowerCase();
    if (role === "merchant") {
      fetch("/api/merchant/overview", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
        .then((res) => res.json())
        .then(setOverview)
        .catch((err) => console.error("Failed to fetch merchant overview:", err));

      fetch("/api/merchant/transactions", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
        .then((res) => res.json())
        .then(setTransactions)
        .catch((err) => console.error("Failed to fetch transactions:", err));
    }
  }, [user]);

  const role = user?.role?.toLowerCase();
  if (role !== "merchant") {
    return <div>Access denied. Merchants only.</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b bg-card">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 space-y-6">
            <h1 className="text-2xl font-bold">Merchant Dashboard</h1>

            {/* Overview cards */}
            <section className="grid grid-cols-4 gap-4">
              <div className="p-4 border rounded bg-card">
                <h2 className="font-semibold">Balance</h2>
                <p className="text-lg">
                  {overview?.totalBalance?.toLocaleString() ?? "Loading..."}
                </p>
              </div>
              <div className="p-4 border rounded bg-card">
                <h2 className="font-semibold">Revenue</h2>
                <p className="text-lg">
                  {overview?.totalRevenue?.toLocaleString() ?? "Loading..."}
                </p>
              </div>
              <div className="p-4 border rounded bg-card">
                <h2 className="font-semibold">Transactions</h2>
                <p className="text-lg">
                  {overview?.totalTransactions ?? "Loading..."}
                </p>
              </div>
              <div className="p-4 border rounded bg-card">
                <h2 className="font-semibold">Success Rate</h2>
                <p className="text-lg">
                  {overview?.successRate ? `${overview.successRate}%` : "Loading..."}
                </p>
              </div>
            </section>

            {/* Transactions list */}
            <section>
              <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
              {transactions.length > 0 ? (
                <ul className="space-y-2">
                  {transactions.map((tx) => (
                    <li key={tx.id} className="p-2 border rounded bg-card flex justify-between">
                      <span>{tx.date}</span>
                      <span>
                        {tx.amount} {tx.currency}
                      </span>
                      <span
                        className={
                          tx.status.toLowerCase() === "success"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {tx.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions yet.</p>
              )}
            </section>

            {/* Quick actions */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
              <div className="flex gap-4">
                <Button>Generate Payment Link</Button>
                <Button>Request Payout</Button>
                <Button>View Analytics</Button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
