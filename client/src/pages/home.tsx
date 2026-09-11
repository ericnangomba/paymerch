import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  BarChart3, 
  Shield, 
  Globe, 
  Code, 
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  Zap,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Clock,
  TrendingUp,
  Users,
  Award,
  Lock,
  Rocket,
  DollarSign,
  PieChart,
  Layers,
  MessageSquare,
  Building2,
  Play,
} from "lucide-react";
import { SiVisa, SiMastercard, SiPaypal, SiStripe } from "react-icons/si";
import dashboardImage from "@assets/generated_images/Merchant_dashboard_preview_f82fecf1.png";
import checkoutImage from "@assets/generated_images/Payment_checkout_interface_a8d4ddae.png";
import apiImage from "@assets/generated_images/API_integration_coding_9329f2b0.png";
import payoutImage from "@assets/generated_images/Payout_success_screen_cdb36df6.png";
import secureInfrastructureImage from "@assets/generated_images/Secure Infrastructure.webp";
import globalCoverageImage from "@assets/generated_images/Global Coverage.jpg";
import easyIntegrationImage from "@assets/generated_images/Easy Integration.jpg";
import supportImage from "@assets/generated_images/247Support.jpg";
import { useAuth } from '@/lib/useAuth';
import HeaderAuth from '@/components/header-auth';
import FooterCompany from '@/components/footer-company';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
          <Link href="/" data-testid="link-home-logo">
            <div className="flex items-center gap-2">
              <img
                src="/paymerch.png"
                alt="Brand logo"
                className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[125px] w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-4 sm:gap-6">
            <a href="#features" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">
              Features
            </a>
            <a href="#pricing" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">
              Pricing
            </a>
            <a href="#how-it-works" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-how-it-works">
              How It Works
            </a>
            <a href="#contact" className="text-xs sm:text-sm font-medium text-accent-secondary hover:text-accent-secondary/80 transition-colors font-semibold" data-testid="link-contact">
              Contact Us
            </a>
          </nav>

          <div className="flex items-center justify-end">
            <HeaderAuth />
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-secondary/20 via-background to-background"></div>
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="flex justify-center lg:justify-start">
                <Badge className="w-fit bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/30 text-xs sm:text-sm" variant="secondary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trusted by 10,000+ merchants worldwide
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Accept Payments <span className="text-accent-secondary">Globally</span> with Ease
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                The most powerful payment platform for modern businesses. Accept credit cards, mobile money, and bank transfers with enterprise-grade security and instant payouts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link href="/signup" data-testid="button-get-started-hero">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-accent text-accent-foreground border-accent hover:bg-accent/90 shadow-lg">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/checkout/demo" data-testid="button-view-demo">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-accent-secondary text-accent-secondary-foreground border-accent-secondary hover:bg-accent-secondary/90 shadow-lg">
                    View Demo <Play className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span>Free API access</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span>Instant payouts</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <SiVisa className="h-6 w-9 sm:h-8 sm:w-12 text-muted-foreground" />
                  <SiMastercard className="h-6 w-9 sm:h-8 sm:w-12 text-muted-foreground" />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">99.9%</span> uptime
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">24/7</span> support
                </div>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border mx-auto max-w-md lg:max-w-none lg:-mr-12 bg-gradient-to-br from-background to-muted/20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 to-accent/5"></div>
                <img 
                  src={payoutImage} 
                  alt="Dashboard preview"
                  className="w-full h-auto relative z-10"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Today's Revenue</p>
                        <p className="text-2xl font-bold text-accent-secondary">R12,450.00</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">+23%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 sm:py-16 md:py-24 bg-muted/50">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="mx-auto text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Everything You Need to Succeed</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Powerful features designed to help you grow your business globally with enterprise-grade tools
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <Card className="hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg relative">
                  <img src={checkoutImage}
                    alt="payment methods"
                    className="w-full h-32 sm:h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-accent-secondary text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-accent-secondary" />
                  <CardTitle className="text-base sm:text-lg">Multiple Payment Methods</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  Accept credit cards (Visa, Mastercard), mobile money (M-Pesa, MTN), and bank transfers. Support for 50+ currencies with automatic conversion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>Real-time payment processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>Automatic currency conversion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>Mobile-optimized checkout</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg relative">
                  <img src={dashboardImage}
                    alt="analytics"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  <CardTitle>Real-time Analytics</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Track revenue, transactions, customer behavior, and trends with powerful dashboards. Export reports and set up custom alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    <span>Live transaction monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    <span>Custom report generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    <span>Revenue forecasting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg relative">
                  <img src={secureInfrastructureImage}
                    alt="security"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Secure
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <CardTitle>Secure Infrastructure</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Bank-level encryption, PCI DSS Level 1 compliance, and advanced fraud detection. Your data and your customers' data are protected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>PCI DSS Level 1 certified</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>AI-powered fraud detection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg relative">
                  <img src={globalCoverageImage}
                    alt="global coverage"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-accent-secondary text-white text-xs px-2 py-1 rounded-full">
                    Global
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-accent-secondary" />
                  <CardTitle>Global Coverage</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Accept payments from customers in 190+ countries. Local payment methods, multi-currency support, and regional settlement options.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>190+ countries supported</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>50+ currencies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>Local payment methods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg relative">
                  <img src={easyIntegrationImage}
                    alt="integration"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Easy
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-5 w-5 text-accent" />
                  <CardTitle>Easy Integration</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  RESTful API with comprehensive documentation, SDKs for major platforms, and pre-built payment links. Integrate in minutes, not days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    <span>RESTful API & webhooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    <span>SDKs for all platforms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    <span>Instant payment links</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg relative">
                  <img src={supportImage}
                    alt="support"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-accent-secondary text-white text-xs px-2 py-1 rounded-full">
                    24/7
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <HeadphonesIcon className="h-5 w-5 text-accent-secondary" />
                  <CardTitle>24/7 Premium Support</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Dedicated support team available around the clock via chat, email, and phone. Priority support for enterprise customers with dedicated account managers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>24/7 live chat support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>Email response &lt; 2 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent-secondary" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-6 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in four simple steps and start accepting payments today
            </p>
          </div>
          <div className="space-y-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-accent-secondary text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    1
                  </div>
                  <h3 className="text-3xl font-bold">Sign Up</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Create your merchant account in minutes with our streamlined onboarding process. No complicated paperwork or long approval delays.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-accent-secondary" />
                    <span>Quick verification process (under 5 minutes)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-accent-secondary" />
                    <span>No setup fees or hidden costs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-accent-secondary" />
                    <span>Instant account activation</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-muted/20 bg-gradient-to-br from-background to-muted/20">
                <img src={dashboardImage} alt="Sign up process" className="w-full h-auto" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-accent-secondary" />
                      <span className="text-sm font-medium">Account created successfully!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative rounded-xl overflow-hidden shadow-2xl border border-muted/20 bg-gradient-to-br from-background to-muted/20">
                <img src={apiImage} alt="API integration" className="w-full h-auto" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">API integration complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-accent text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    2
                  </div>
                  <h3 className="text-3xl font-bold">Integrate</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Add payments to your website or app with our simple RESTful API or use payment links for instant setup without coding.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-accent" />
                    <span>RESTful API with comprehensive documentation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-accent" />
                    <span>SDKs for all major platforms (React, Node, Python)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-accent" />
                    <span>Pre-built payment links ready to share</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-accent-secondary text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    3
                  </div>
                  <h3 className="text-3xl font-bold">Accept Payments</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Start receiving payments from customers using their preferred payment method with our optimized checkout experience.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-accent-secondary" />
                    <span>Cards, mobile money, bank transfers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-accent-secondary" />
                    <span>Mobile-optimized checkout experience</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-accent-secondary" />
                    <span>Real-time payment confirmation</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-muted/20 bg-gradient-to-br from-background to-muted/20">
                <img src={checkoutImage} alt="Payment checkout" className="w-full h-auto" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Payment successful!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative rounded-xl overflow-hidden shadow-2xl border border-muted/20 bg-gradient-to-br from-background to-muted/20">
                <img src={payoutImage} alt="Get paid" className="w-full h-auto" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Payout processed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-accent text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    4
                  </div>
                  <h3 className="text-3xl font-bold">Get Paid</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Request payouts to your bank account anytime with our fast processing system. Automated daily payouts available.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>Same-day settlement for most transactions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>Transparent fee structure (no hidden charges)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>Automated daily payouts available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-muted/50">
        <div className="container px-6 mx-auto">
          <div className="mx-auto text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pay only for what you use. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            <Card className="hover-elevate transition-all duration-300 text-left">
              <CardHeader className="space-y-6">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div>
                  <div className="text-4xl font-bold">2.9%</div>
                  <p className="text-muted-foreground mt-2">+ R3.50 per transaction (ZAR)</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">All payment methods</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Link href="/signup" data-testid="button-pricing-starter">
                  <Button className="w-full bg-accent text-accent-foreground border-accent hover:bg-accent/90">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 border-primary shadow-lg relative text-left">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              <CardHeader className="space-y-6">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div>
                  <div className="text-4xl font-bold">2.5%</div>
                  <p className="text-muted-foreground mt-2">+ R3.00 per transaction (ZAR)</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">All payment methods</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Custom branding</span>
                  </li>
                </ul>
                <Link href="/signup" data-testid="button-pricing-pro">
                  <Button className="w-full bg-accent-secondary text-accent-secondary-foreground border-accent-secondary hover:bg-accent-secondary/90">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 text-left">
              <CardHeader className="space-y-6">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div>
                  <div className="text-4xl font-bold">Custom</div>
                  <p className="text-muted-foreground mt-2">Tailored pricing</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">All payment methods</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">24/7 phone support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Custom integration</span>
                  </li>
                </ul>
                <Link href="/signup" data-testid="button-pricing-enterprise">
                  <Button className="w-full bg-accent-secondary text-accent-secondary-foreground border-accent-secondary hover:bg-accent-secondary/90">Contact Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-6 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Trusted by Businesses Worldwide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of merchants who trust PayMerch for their payment needs
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-secondary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Merchants</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">$50M+</div>
              <div className="text-muted-foreground">Processed Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-secondary mb-2">190+</div>
              <div className="text-muted-foreground">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-20 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Have questions? Our team is here to help you succeed
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-accent-secondary/10 flex items-center justify-center mb-3 sm:mb-4">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-accent-secondary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Email Us</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Get in touch via email for general inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:support@paymerch.com" className="text-accent-secondary font-medium hover:underline text-sm sm:text-base">
                  support@paymerch.com
                </a>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Response time: &lt; 2 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate transition-all duration-300 border-2 hover:border-accent/50">
              <CardHeader>
                <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 sm:mb-4">
                  <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                </div>
                <CardTitle className="text-base sm:text-lg">Call Us</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Speak with our support team directly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="tel:+27123456789" className="text-accent font-medium hover:underline text-sm sm:text-base">
                  +27 12 345 6789
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Mon-Fri: 9AM - 6PM SAST
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate transition-all duration-300 border-2 hover:border-accent-secondary/50">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-accent-secondary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-accent-secondary" />
                </div>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>
                  Chat with us in real-time for instant support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-accent-secondary text-accent-secondary-foreground border-accent-secondary hover:bg-accent-secondary/90">
                  Start Chat
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Available 24/7
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <input type="text" placeholder="Your name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input type="email" placeholder="your@email.com" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <input type="text" placeholder="How can we help?" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea placeholder="Tell us more about your needs..." rows="4" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary"></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground border-accent hover:bg-accent/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container px-6 mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to Start Accepting Payments?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Join thousands of businesses already growing locally and abroad
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/signup" data-testid="button-cta-main">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground border-accent hover:bg-accent/90">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="text-sm opacity-75">No setup fees • Cancel anytime</p>
        </div>
      </section>

      <footer className="border-t py-8 sm:py-12 bg-muted/20">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 text-left">
            <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <img src="/paymerch_icon.png" alt="Brand icon" className="h-[40px] sm:h-[50px] w-auto object-contain" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                Global payment solutions for modern businesses. Accept payments anywhere, anytime.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
                <SiVisa className="h-6 w-9 sm:h-8 sm:w-12 text-muted-foreground" />
                <SiMastercard className="h-6 w-9 sm:h-8 sm:w-12 text-muted-foreground" />
                <SiPaypal className="h-6 w-9 sm:h-8 sm:w-12 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors" data-testid="footer-link-features">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors" data-testid="footer-link-pricing">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors" data-testid="footer-link-how-it-works">How It Works</a></li>
                <li><a href="#contact" className="hover:text-accent-secondary transition-colors font-medium" data-testid="footer-link-contact">Contact Us</a></li>
              </ul>
            </div>
            <FooterCompany />
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-privacy">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-terms">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-security">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <p>&copy; 2025 PayMerch. All rights reserved.</p>
              <div className="flex items-center gap-3 sm:gap-4">
                <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
