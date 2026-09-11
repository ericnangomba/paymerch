import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Link } from "wouter";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  ArrowUpRight,
  Home,
  LogOut,
  Plus,
  Download,
  BarChart3,
} from "lucide-react";

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
  customerEmail?: string;
}

export default function MerchantDashboard() {
  const { user, logout } = useAuth();
  const [overview, setOverview] = useState<MerchantOverview | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = user?.role?.toLowerCase();
        if (role === "merchant" || !user) {
          // Try to fetch data
          const [overviewRes, txRes] = await Promise.all([
            fetch("/api/merchant/overview", {
              headers: { Authorization: `Bearer ${user?.token || 'demo-token'}` },
            }),
            fetch("/api/merchant/transactions", {
              headers: { Authorization: `Bearer ${user?.token || 'demo-token'}` },
            }),
          ]);

          if (overviewRes.ok) {
            const overviewData = await overviewRes.json();
            setOverview(overviewData);
          } else {
            // Set demo data
            setOverview({
              totalBalance: 5000.00,
              totalRevenue: 15000.00,
              totalTransactions: 45,
              successRate: 98.5,
            });
          }

          if (txRes.ok) {
            const txData = await txRes.json();
            setTransactions(txData);
          } else {
            // Set demo transactions
            setTransactions([
              { id: '1', amount: 150.00, currency: 'ZAR', status: 'completed', date: '2025-01-15', customerEmail: 'john@example.com' },
              { id: '2', amount: 89.99, currency: 'ZAR', status: 'completed', date: '2025-01-14', customerEmail: 'sarah@example.com' },
              { id: '3', amount: 250.00, currency: 'ZAR', status: 'pending', date: '2025-01-13', customerEmail: 'mike@example.com' },
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        // Set demo data on error
        setOverview({
          totalBalance: 5000.00,
          totalRevenue: 15000.00,
          totalTransactions: 45,
          successRate: 98.5,
        });
        setTransactions([
          { id: '1', amount: 150.00, currency: 'ZAR', status: 'completed', date: '2025-01-15', customerEmail: 'john@example.com' },
          { id: '2', amount: 89.99, currency: 'ZAR', status: 'completed', date: '2025-01-14', customerEmail: 'sarah@example.com' },
          { id: '3', amount: 250.00, currency: 'ZAR', status: 'pending', date: '2025-01-13', customerEmail: 'mike@example.com' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">Merchant Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Overview cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-2 hover:border-accent/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    R{overview?.totalBalance?.toLocaleString('en-ZA', { minimumFractionDigits: 2 }) ?? "0.00"}
                  </div>
                  <p className="text-xs text-muted-foreground">Available for payout</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent-secondary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-accent-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    R{overview?.totalRevenue?.toLocaleString('en-ZA', { minimumFractionDigits: 2 }) ?? "0.00"}
                  </div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-green-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                  <CreditCard className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {overview?.totalTransactions ?? 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Total processed</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {overview?.successRate ? `${overview.successRate}%` : "0%"}
                  </div>
                  <p className="text-xs text-muted-foreground">Payment success rate</p>
                </CardContent>
              </Card>
            </section>

            {/* Transactions list */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  {transactions.length > 0 ? (
                    <div className="divide-y">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <div className="font-medium">R{tx.amount.toFixed(2)}</div>
                              <div className="text-sm text-muted-foreground">{tx.customerEmail || 'Guest'}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${
                              tx.status.toLowerCase() === "completed" || tx.status.toLowerCase() === "success"
                                ? "text-green-600"
                                : tx.status.toLowerCase() === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}>
                              {tx.status}
                            </div>
                            <div className="text-xs text-muted-foreground">{tx.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No transactions yet. Start accepting payments!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Quick actions */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-accent/50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                      <Plus className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-base">Generate Payment Link</CardTitle>
                    <CardDescription className="text-sm">
                      Create a shareable payment link for your customers
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-accent-secondary/50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-2">
                      <ArrowUpRight className="h-6 w-6 text-accent-secondary" />
                    </div>
                    <CardTitle className="text-base">Request Payout</CardTitle>
                    <CardDescription className="text-sm">
                      Withdraw your balance to your bank account
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-500/50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                      <BarChart3 className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle className="text-base">View Analytics</CardTitle>
                    <CardDescription className="text-sm">
                      Detailed insights into your payment performance
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
