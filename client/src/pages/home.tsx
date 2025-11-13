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
} from "lucide-react";
import { SiVisa, SiMastercard } from "react-icons/si";
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
        <div className="container flex h-16 items-center justify-between px-6">
          <Link href="/" data-testid="link-home-logo">
              <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl">PayMerch</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">
              Pricing
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-how-it-works">
              How It Works
            </a>
          </nav>

          <HeaderAuth />
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        <div className="container relative z-10 px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="w-fit" variant="secondary">
                Trusted by 10,000+ merchants worldwide
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Accept Payments <span className="text-primary">Globally</span> with Ease
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                The easiest way to accept payments from anywhere in the world. Multiple payment methods, real-time analytics, and instant payouts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup" data-testid="button-get-started-hero">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/checkout/demo" data-testid="button-view-demo">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Free API access</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border -mr-12">
                <img 
                  src={payoutImage} 
                  alt="PayMerch Dashboard" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-muted/50">
        <div className="container px-6 mx-auto">
          <div className="mx-auto text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you grow your business globally
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                      <img src={checkoutImage}
                        alt="payment methods"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                <CardTitle>Multiple Payment Methods</CardTitle>
                <CardDescription>
                  Accept credit cards, mobile money and bank transfers. Currency displayed as ZAR by default.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img src={dashboardImage}
                    alt="analytics"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Track revenue, transactions and trends with powerful dashboards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img src={secureInfrastructureImage}
                    alt="security"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardTitle>Secure Infrastructure</CardTitle>
                <CardDescription>
                  Bank-level encryption and PCI standards to keep data secure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img src={globalCoverageImage}
                    alt="global coverage"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardTitle>Global Coverage</CardTitle>
                <CardDescription>
                  Support and reach across regions with local settlement options; default currency is ZAR.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img src={easyIntegrationImage}
                    alt="integration"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Simple APIs and payment links to get you up and running in minutes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img src={supportImage}
                    alt="support"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  Our team is here to help you succeed whenever you need assistance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="container px-6 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in four simple steps
            </p>
          </div>
          <div className="space-y-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-3xl font-bold">Sign Up</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Create your merchant account in minutes. No complicated paperwork or long approval processes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Quick verification process</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>No setup fees or hidden costs</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-xl border">
                <img src={dashboardImage} alt="Sign up process" className="w-full h-auto" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative rounded-lg overflow-hidden shadow-xl border">
                <img src={apiImage} alt="API integration" className="w-full h-auto" />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-3xl font-bold">Integrate</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Add PayMerch to your website or app with our simple API or use payment links for instant setup.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-primary" />
                    <span>RESTful API with clear documentation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-primary" />
                    <span>Pre-built payment links ready to share</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-3xl font-bold">Accept Payments</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Start receiving payments from customers using their preferred payment method.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span>Cards, mobile money, bank transfers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span>Mobile-optimized checkout</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-xl border">
                <img src={checkoutImage} alt="Payment checkout" className="w-full h-auto" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative rounded-lg overflow-hidden shadow-xl border">
                <img src={payoutImage} alt="Get paid" className="w-full h-auto" />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <h3 className="text-3xl font-bold">Get Paid</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Request payouts to your bank account anytime with fast processing.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Fast settlement times</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Transparent fee structure</span>
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
                  <Button className="w-full" variant="outline">Get Started</Button>
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
                  <Button className="w-full">Get Started</Button>
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
                  <Button className="w-full" variant="outline">Contact Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container px-6 mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to Start Accepting Payments?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Join thousands of businesses already using PayMerch to grow locally and abroad
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/signup" data-testid="button-cta-main">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="text-sm opacity-75">No setup fees • Cancel anytime</p>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container px-6 mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-8 md:text-left">
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">P</span>
                </div>
                <span className="font-bold text-xl">PayMerch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Global payment solutions for modern businesses
              </p>
              <div className="flex items-center gap-4">
                <SiVisa className="h-8 w-12 text-muted-foreground" />
                <SiMastercard className="h-8 w-12 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors" data-testid="footer-link-features">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors" data-testid="footer-link-pricing">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-api">API Docs</a></li>
              </ul>
            </div>
            <FooterCompany />
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-privacy">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-terms">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-security">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PayMerch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
