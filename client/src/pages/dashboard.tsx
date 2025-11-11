import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, DollarSign, Receipt, TrendingUp, CreditCard } from "lucide-react";
import { Link } from "wouter";

// Define types locally to remove dependency on the old, deleted schema file
type Merchant = {
  id: string;
  businessName: string;
  email: string;
  currency: string;
  balance: string;
  totalRevenue: string;
  totalTransactions: number;
  createdAt: string;
};

type Transaction = {
  id: string;
  merchantId: string;
  customerEmail: string | null;
  customerName: string | null;
  amount: string;
  currency: string;
  status: 'completed' | 'failed' | 'pending';
  paymentMethod: string;
  description: string | null;
  reference: string;
  createdAt: string;
};

export default function Dashboard() {
  const { data: merchant, isLoading: merchantLoading } = useQuery<Merchant>({
    queryKey: ["/api/merchant"],
  });

  const { data: recentTransactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions/recent"],
  });

  const { data: stats } = useQuery<{
    todayRevenue: number;
    todayTransactions: number;
    successRate: number;
    revenueChange: number;
  }>({
    queryKey: ["/api/stats"],
  });

  if (merchantLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {merchant?.businessName || "Merchant"}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-balance">
              R{parseFloat(merchant?.balance || "0").toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {merchant?.currency || "ZAR"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-revenue">
              R{parseFloat(merchant?.totalRevenue || "0").toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {stats && (
              <div className={`flex items-center gap-1 text-xs mt-1 ${stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.revenueChange >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{stats.revenueChange}% from last month</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-transactions">
              {merchant?.totalTransactions?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.todayTransactions || 0} today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-success-rate">
              {stats?.successRate || 98}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link href="/dashboard/transactions" data-testid="link-view-all-transactions">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {transactionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : !recentTransactions || recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground" data-testid="text-no-transactions">
                <p>No transactions yet</p>
                <p className="text-sm mt-2">Start accepting payments to see them here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between" data-testid={`transaction-${transaction.id}`}>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{transaction.customerEmail || "Anonymous"}</p>
                      <p className="text-xs text-muted-foreground">{transaction.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        R{parseFloat(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <Badge 
                        variant={
                          transaction.status === "completed" ? "default" : 
                          transaction.status === "pending" ? "secondary" : 
                          "destructive"
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get things done faster</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/payment-links" data-testid="button-create-payment-link">
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Generate Payment Link
              </Button>
            </Link>
            <Link href="/dashboard/payouts" data-testid="button-request-payout">
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
            </Link>
            <Link href="/dashboard/analytics" data-testid="button-view-analytics">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
