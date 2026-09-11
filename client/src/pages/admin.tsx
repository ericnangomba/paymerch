import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/useAuth";

type Merchant = { id: string; businessName: string; email: string; balance: string };
type Transaction = { id: string; merchantId: string; amount: string; status: string; createdAt: string; paymentMethod?: string };
type Payout = { id: string; merchantId: string; amount: string; status: string; createdAt: string };

export default function Admin() {
  const { user, loading } = useAuth();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user || !user.isAdmin) {
      setError("Access denied: Admins only.");
      return;
    }

    const fetchAll = async () => {
      try {
        const [mRes, tRes, pRes] = await Promise.all([
          fetch('/api/admin/merchants', { headers: { Authorization: `Bearer ${await getToken()}` } }),
          fetch('/api/admin/transactions', { headers: { Authorization: `Bearer ${await getToken()}` } }),
          fetch('/api/admin/payouts', { headers: { Authorization: `Bearer ${await getToken()}` } }),
        ]);

        if (!mRes.ok) throw new Error('Failed to fetch merchants');
        if (!tRes.ok) throw new Error('Failed to fetch transactions');
        if (!pRes.ok) throw new Error('Failed to fetch payouts');

        setMerchants(await mRes.json());
        setTransactions(await tRes.json());
        setPayouts(await pRes.json());
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load admin data');
      }
    };

    fetchAll();
  }, [user, loading]);

  async function getToken() {
    const s = await (await import('@/lib/supabaseClient')).supabase.auth.getSession();
    return s.data.session?.access_token || '';
  }

  if (loading) return <div className="container px-6 py-10">Loading...</div>;
  if (error) return <div className="container px-6 py-10 text-destructive">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/paymerch.png" alt="Brand logo" className="h-[125px] w-auto object-contain" />
            <h1 className="text-xl font-bold">Admin</h1>
          </div>
          <div>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-6 py-10">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard (MVP)</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold">Merchants ({merchants.length})</h3>
            <p className="text-sm text-muted-foreground">View and manage merchant accounts.</p>
            <div className="mt-4">
              <Button onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })}>Open Merchants</Button>
            </div>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold">Transactions ({transactions.length})</h3>
            <p className="text-sm text-muted-foreground">Search, refund and manage transactions.</p>
            <div className="mt-4">
              <Button>Open Transactions</Button>
            </div>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold">Payouts ({payouts.length})</h3>
            <p className="text-sm text-muted-foreground">Review and approve payouts.</p>
            <div className="mt-4">
              <Button>Open Payouts</Button>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Recent Merchants</h3>
          <div className="grid gap-4">
            {merchants.slice(0, 10).map(m => (
              <div key={m.id} className="p-4 border rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{m.businessName}</div>
                    <div className="text-sm text-muted-foreground">{m.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">R{m.balance}</div>
                    <div className="text-sm text-muted-foreground">Balance</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>
          <div className="grid gap-2">
            {transactions.slice(0, 15).map(tx => (
              <div key={tx.id} className="p-3 border rounded flex justify-between">
                <div>
                  <div className="font-medium">R{tx.amount}</div>
                  <div className="text-sm text-muted-foreground">{tx.paymentMethod || '—'}</div>
                </div>
                <div className="text-sm text-muted-foreground">{new Date(tx.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
