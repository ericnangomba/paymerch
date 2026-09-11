import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/useAuth";
import { 
  Users, 
  CreditCard, 
  DollarSign, 
  AlertTriangle, 
  Shield, 
  Brain, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell,
  Search,
  Filter,
  Download,
  Activity,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Lock,
  Database,
  Cpu,
  Network,
  Eye,
  Ban,
  RefreshCw,
  FileCode,
  MessageSquare,
  Target,
  PieChart,
  LineChart,
} from "lucide-react";

type Merchant = { id: string; businessName: string; email: string; balance: string; status: string; createdAt: string };
type Transaction = { id: string; merchantId: string; amount: string; status: string; createdAt: string; paymentMethod?: string; riskScore?: number; fraudFlag?: boolean };
type Payout = { id: string; merchantId: string; amount: string; status: string; createdAt: string };
type FraudAlert = { id: string; type: string; severity: 'low' | 'medium' | 'high'; description: string; timestamp: string; resolved: boolean };
type SystemMetric = { name: string; value: string; trend: 'up' | 'down' | 'stable'; change: string };

export default function Admin() {
  const { user, loading, logout } = useAuth();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

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
        
        // Mock data for demo purposes
        setFraudAlerts([
          { id: '1', type: 'Unusual Activity', severity: 'high', description: 'Multiple failed login attempts from IP 192.168.1.100', timestamp: new Date().toISOString(), resolved: false },
          { id: '2', type: 'Large Transaction', severity: 'medium', description: 'Transaction amount R50,000 exceeds threshold', timestamp: new Date(Date.now() - 3600000).toISOString(), resolved: false },
          { id: '3', type: 'Velocity Check', severity: 'low', description: 'Rapid transactions from single merchant', timestamp: new Date(Date.now() - 7200000).toISOString(), resolved: true },
        ]);

        setSystemMetrics([
          { name: 'System Health', value: '99.9%', trend: 'stable', change: '+0.1%' },
          { name: 'Transaction Volume', value: 'R2.5M', trend: 'up', change: '+15%' },
          { name: 'Active Users', value: '1,234', trend: 'up', change: '+8%' },
          { name: 'Fraud Rate', value: '0.02%', trend: 'down', change: '-0.01%' },
          { name: 'API Response Time', value: '120ms', trend: 'stable', change: '+5ms' },
          { name: 'Database Load', value: '45%', trend: 'down', change: '-10%' },
        ]);
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
      <header className="border-b bg-gradient-to-r from-purple-900/10 to-indigo-900/10 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/paymerch_icon.png" alt="Brand logo" className="h-[40px] sm:h-[50px] w-auto object-contain" />
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Admin Dashboard</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">AI-Powered Payment Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {fraudAlerts.filter(a => !a.resolved).length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                  {fraudAlerts.filter(a => !a.resolved).length}
                </Badge>
              )}
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">Home</Button>
            </Link>
            <Button variant="destructive" size="sm" className="text-xs sm:text-sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 lg:w-auto lg:inline-grid gap-1 sm:gap-2 bg-purple-100 dark:bg-purple-900/30">
            <TabsTrigger value="overview" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Transactions</TabsTrigger>
            <TabsTrigger value="merchants" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Merchants</TabsTrigger>
            <TabsTrigger value="fraud" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Fraud</TabsTrigger>
            <TabsTrigger value="ai-ml" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">AI/ML</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="border-2 hover:border-purple-500/50 transition-all bg-gradient-to-br from-purple-500/5 to-purple-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R45,231,890</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-indigo-500/50 transition-all bg-gradient-to-br from-indigo-500/5 to-indigo-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                  <CreditCard className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{transactions.length}</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-pink-500/50 transition-all bg-gradient-to-br from-pink-500/5 to-pink-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
                  <Users className="h-4 w-4 text-pink-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{merchants.length}</div>
                  <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-red-500/50 transition-all bg-gradient-to-br from-red-500/5 to-red-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fraud Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{fraudAlerts.filter(a => !a.resolved).length}</div>
                  <p className="text-xs text-muted-foreground">-15% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent-secondary" />
                    System Performance
                  </CardTitle>
                  <CardDescription>Real-time system metrics and health indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-accent-secondary/10 flex items-center justify-center">
                            {metric.name === 'System Health' && <Activity className="h-5 w-5 text-accent-secondary" />}
                            {metric.name === 'Transaction Volume' && <TrendingUp className="h-5 w-5 text-accent" />}
                            {metric.name === 'Active Users' && <Users className="h-5 w-5 text-green-500" />}
                            {metric.name === 'Fraud Rate' && <Shield className="h-5 w-5 text-red-500" />}
                            {metric.name === 'API Response Time' && <Zap className="h-5 w-5 text-yellow-500" />}
                            {metric.name === 'Database Load' && <Database className="h-5 w-5 text-blue-500" />}
                          </div>
                          <div>
                            <div className="font-medium">{metric.name}</div>
                            <div className="text-sm text-muted-foreground">{metric.value}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {metric.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                          {metric.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-green-500" />}
                          {metric.trend === 'stable' && <Activity className="h-4 w-4 text-muted-foreground" />}
                          <span className={`text-sm ${metric.trend === 'up' || metric.trend === 'down' ? 'text-green-500' : 'text-muted-foreground'}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-accent" />
                    AI/ML Insights
                  </CardTitle>
                  <CardDescription>Machine learning predictions and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-accent-secondary/10 border border-accent/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="font-medium">Revenue Forecast</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Predicted revenue for next month: R52,000,000 (+15% growth)</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Fraud Prevention</span>
                      </div>
                      <p className="text-sm text-muted-foreground">AI blocked 127 potential fraud attempts this week, saving R1.2M</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">User Behavior</span>
                      </div>
                      <p className="text-sm text-muted-foreground">User retention rate improved by 8% following personalized recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Active Fraud Alerts
                </CardTitle>
                <CardDescription>Real-time fraud detection and security alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fraudAlerts.filter(a => !a.resolved).map(alert => (
                    <div key={alert.id} className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                            {alert.severity}
                          </Badge>
                          <div>
                            <div className="font-medium">{alert.type}</div>
                            <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{new Date(alert.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Investigate</Button>
                          <Button size="sm" variant="destructive">Block</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {fraudAlerts.filter(a => !a.resolved).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                      <p>No active fraud alerts. System is secure.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" />
                  Transaction Management
                </CardTitle>
                <CardDescription>Monitor, search, and manage all transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search transactions..." 
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                <div className="space-y-2">
                  {transactions.slice(0, 10).map(tx => (
                    <div key={tx.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <div className="font-medium">R{tx.amount}</div>
                            <div className="text-sm text-muted-foreground">{tx.paymentMethod || 'Card'}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}>
                            {tx.status}
                          </Badge>
                          {tx.riskScore && (
                            <Badge variant={tx.riskScore > 70 ? 'destructive' : tx.riskScore > 40 ? 'default' : 'secondary'}>
                              Risk: {tx.riskScore}%
                            </Badge>
                          )}
                          <div className="text-sm text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleString()}
                          </div>
                          <Button size="sm" variant="ghost">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Merchant Management
                </CardTitle>
                <CardDescription>View and manage merchant accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {merchants.slice(0, 10).map(m => (
                    <div key={m.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <div className="font-medium">{m.businessName}</div>
                            <div className="text-sm text-muted-foreground">{m.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={m.status === 'active' ? 'default' : 'secondary'}>
                            {m.status || 'Active'}
                          </Badge>
                          <div className="text-right">
                            <div className="font-medium">R{m.balance}</div>
                            <div className="text-sm text-muted-foreground">Balance</div>
                          </div>
                          <Button size="sm" variant="ghost">Manage</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fraud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  Fraud Detection System
                </CardTitle>
                <CardDescription>AI-powered fraud detection and prevention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Real-time Monitoring</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Continuous transaction monitoring with ML models</p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Pattern Recognition</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Advanced pattern detection and anomaly analysis</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Automated Blocking</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Instant blocking of suspicious transactions</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {fraudAlerts.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${alert.resolved ? 'opacity-50' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                            {alert.severity}
                          </Badge>
                          <div>
                            <div className="font-medium">{alert.type}</div>
                            <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{new Date(alert.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!alert.resolved ? (
                            <>
                              <Button size="sm" variant="outline">Investigate</Button>
                              <Button size="sm" variant="destructive">Block</Button>
                            </>
                          ) : (
                            <Badge variant="default">Resolved</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-ml" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-accent" />
                    Machine Learning Models
                  </CardTitle>
                  <CardDescription>Active ML models and their performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Fraud Detection Model</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Accuracy: 99.2% | False Positive Rate: 0.8%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Revenue Prediction Model</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">MAE: 2.3% | Training Data: 2.5M records</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Customer Churn Model</span>
                        <Badge className="bg-yellow-500">Training</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Progress: 75% | Expected Accuracy: 94%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent-secondary" />
                    LLM Integration
                  </CardTitle>
                  <CardDescription>Open-source LLM integration for automated analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-accent-secondary/10 border border-accent/20">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-accent" />
                        <span className="font-medium">Document Processing</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Automated document analysis and extraction using Llama 3</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Customer Support AI</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Intelligent chatbot powered by Mistral for 24/7 support</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Fraud Analysis</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Deep learning analysis of transaction patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent-secondary" />
                  Data Analysis & Research
                </CardTitle>
                <CardDescription>Advanced analytics and research capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <PieChart className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <div className="font-medium">Revenue Analytics</div>
                    <p className="text-sm text-muted-foreground">Real-time revenue tracking</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <LineChart className="h-8 w-8 mx-auto mb-2 text-accent-secondary" />
                    <div className="font-medium">Trend Analysis</div>
                    <p className="text-sm text-muted-foreground">Market trend predictions</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <FileCode className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="font-medium">Data Mining</div>
                    <p className="text-sm text-muted-foreground">Pattern discovery</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <Network className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="font-medium">Network Analysis</div>
                    <p className="text-sm text-muted-foreground">Transaction networks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  System Configuration
                </CardTitle>
                <CardDescription>Manage system settings and configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-4">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Two-Factor Authentication</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>IP Whitelist</span>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>API Rate Limiting</span>
                        <Button size="sm" variant="outline">Adjust</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-4">AI/ML Configuration</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Fraud Detection Threshold</span>
                        <Button size="sm" variant="outline">Adjust</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Model Retraining Schedule</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>LLM API Configuration</span>
                        <Button size="sm" variant="outline">Setup</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-4">Finance & Document Processing</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Automated Reconciliation</span>
                        <Button size="sm" variant="outline">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Document OCR Processing</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Financial Reporting</span>
                        <Button size="sm" variant="outline">Generate</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
