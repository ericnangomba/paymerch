import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';

export default function MerchantDashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<{ id: string; reference: string; amount: string; currency: string; status: string; }[]>([]);
  const [financials, setFinancials] = useState<{ todayRevenue: number; todayTransactions: number; successRate: number; revenueChange: number; } | null>(null);
  const [vendors, setVendors] = useState<{ id: string; name: string; category: string; }[]>([]);

  useEffect(() => {
    if (user) {
      fetch('/api/transactions', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then(setTransactions);

      fetch('/api/stats', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then(setFinancials);

      fetch('/api/merchant/vendors', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then(setVendors);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) {
    return <div>Please log in to access your dashboard.</div>;
  }

  return (
    <div className="p-6">
      <header className="p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
        <button onClick={logout} className="btn btn-logout">Logout</button>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Transaction Management</h2>
        <p>Manage your transactions efficiently.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Financial Overview</h2>
        {financials ? (
          <div>
            <p>Today's Revenue: R{financials.todayRevenue}</p>
            <p>Today's Transactions: {financials.todayTransactions}</p>
            <p>Success Rate: {financials.successRate}%</p>
            <p>Revenue Change: {financials.revenueChange}%</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Vendor Access</h2>
        <p>Access utilities and manage vendor payments.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Creditors and Debtors</h2>
        <p>Manage your creditors and debtors effectively.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Detailed Analytics</h2>
        <p>Track your revenue, expenses, and transaction trends over time.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Vendor Management</h2>
        <p>Manage vendor relationships and streamline payments.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Real-Time Notifications</h2>
        <p>Stay updated with instant alerts on transactions and account activities.</p>
      </section>
    </div>
  );
}