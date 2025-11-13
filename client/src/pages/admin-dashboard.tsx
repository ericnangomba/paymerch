import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { Button } from "@/components/ui/button";

interface FinancialOverview {
  totalRevenue: number;
  totalBalance: number;
  totalTransactions: number;
}

interface Alert {
  id: number;
  message: string;
  type: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [financialOverview, setFinancialOverview] = useState<FinancialOverview | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  useEffect(() => {
    if (user && user.role === "admin") {
      fetch("/api/admin/financial-overview", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then(setFinancialOverview)
        .catch((err) => console.error("Failed to fetch financial overview:", err));

      fetch("/api/admin/alerts", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then(setAlerts)
        .catch((err) => console.error("Failed to fetch alerts:", err));
    }
  }, [user]);

  // Render access denied message if user is not an admin
  if (user && user.role !== "admin") {
    return <div>Access denied. Admins only.</div>;
  }

  return (
    <div className="p-6">
      <header className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Welcome, Admin</h2>
        {financialOverview ? (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <h3 className="font-medium">Total Balance</h3>
              <p>{financialOverview.totalBalance.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-medium">Total Revenue</h3>
              <p>{financialOverview.totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-medium">Total Transactions</h3>
              <p>{financialOverview.totalTransactions}</p>
            </div>
          </div>
        ) : (
          <p>Loading financial overview...</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Alerts</h2>
        {alerts.length > 0 ? (
          <ul className="space-y-2">
            {alerts.map((alert) => (
              <li key={alert.id} className={`alert alert-${alert.type}`}>
                {alert.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No alerts at this time.</p>
        )}
      </section>
    </div>
  );
}
