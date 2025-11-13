import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [financialOverview, setFinancialOverview] = useState<{ totalRevenue: number; totalBalance: number; totalTransactions: number; } | null>(null);
  const [alerts, setAlerts] = useState<{ id: number; message: string; type: string; }[]>([]);

  useEffect(() => {
    if (user?.isAdmin) {
      fetch('/api/admin/financial-overview', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then(setFinancialOverview);

      fetch('/api/admin/alerts', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then(setAlerts);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user?.isAdmin) {
    return <div>Access denied. Admins only.</div>;
  }

  return (
    <div className="p-6">
      <header className="p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="btn btn-logout">Logout</button>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <p>Welcome, admin@paymerch.co.za</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Financial Overview</h2>
        {financialOverview ? (
          <div>
            <p>Total Revenue: R{financialOverview.totalRevenue}</p>
            <p>Total Balance: R{financialOverview.totalBalance}</p>
            <p>Total Transactions: {financialOverview.totalTransactions}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Administrative Settings</h2>
        <ul>
          <li>Manage APIs</li>
          <li>Update Security Settings</li>
          <li>Configure Payment Gateways</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Alerts and Notifications</h2>
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id} className={`alert alert-${alert.type}`}>
              {alert.message}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Requests and Rejects</h2>
        <p>Manage pending and rejected requests efficiently.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">API Management</h2>
        <Button>Manage APIs</Button>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Security Settings</h2>
        <Button>Update Security</Button>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Gateway Configuration</h2>
        <Button>Configure Gateways</Button>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Advanced Analytics</h2>
        <p>View detailed insights into revenue, transactions, and user activity.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">User Management</h2>
        <p>Manage user roles, permissions, and account statuses.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Enhanced Notifications</h2>
        <p>Receive real-time updates on system events and user activities.</p>
      </section>
    </div>
  );
}