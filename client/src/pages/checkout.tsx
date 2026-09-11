import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Shield, CreditCard, Smartphone, Building2, CheckCircle2 } from "lucide-react";
import { SiVisa, SiMastercard } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Define the PaymentLink type locally, as it was previously in a deleted file.
type PaymentLink = { id: string; merchantId: string; title: string; description: string | null; amount: string; currency: string; link: string; isActive: number; createdAt: string; };

export default function Checkout() {
  const { linkId } = useParams<{ linkId: string }>();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: paymentLink, isLoading } = useQuery<PaymentLink>({
    queryKey: ["/api/payment-links", linkId],
    enabled: !!linkId && linkId !== "demo",
  });

  const demoLink: PaymentLink = {
    id: "demo",
    merchantId: "demo",
    title: "Premium Subscription",
    description: "Monthly subscription to premium features",
    amount: "29.99",
    currency: "ZAR",
    link: "demo",
    isActive: 1,
    createdAt: new Date().toISOString(),
  };

  const link = linkId === "demo" ? demoLink : paymentLink;

  const processPaymentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/transactions/process", data);
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      toast({
        title: "Payment Successful!",
        description: "Your payment has been processed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      linkId: link?.id,
      amount: link?.amount,
      currency: link?.currency,
      paymentMethod,
      customerEmail: formData.get("email"),
      customerName: formData.get("name"),
    };

    await processPaymentMutation.mutateAsync(data);
    setProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!link && linkId !== "demo") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Payment Link Not Found</CardTitle>
            <CardDescription>This payment link is invalid or has expired</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Payment Successful!</h2>
              <p className="text-muted-foreground">
                Your payment of {link!.currency} {parseFloat(link!.amount).toFixed(2)} has been processed successfully
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email shortly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <img src="/paymerch.png" alt="Brand logo" className="h-[85px] w-auto object-contain" />
                </div>
                <CardTitle className="text-2xl">{link!.title}</CardTitle>
                {link!.description && (
                  <CardDescription className="text-base">{link!.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold" data-testid="text-checkout-amount">
                    R{parseFloat(link!.amount).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">{link!.currency}</span>
                </div>
                <Separator />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secured by SSL encryption</span>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <SiVisa className="h-8 w-12 text-muted-foreground" />
                  <SiMastercard className="h-8 w-12 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      data-testid="input-name"
                    />
                  </div>
                </div>

                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card" data-testid="tab-card">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="mobile_money" data-testid="tab-mobile">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Mobile
                    </TabsTrigger>
                    <TabsTrigger value="bank_transfer" data-testid="tab-bank">
                      <Building2 className="h-4 w-4 mr-2" />
                      Bank
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        data-testid="input-card-number"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          data-testid="input-expiry"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          data-testid="input-cvv"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="mobile_money" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+1234567890"
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider</Label>
                      <Input
                        id="provider"
                        placeholder="M-Pesa, MTN, etc."
                        data-testid="input-provider"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="bank_transfer" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="account">Account Number</Label>
                      <Input
                        id="account"
                        placeholder="Account number"
                        data-testid="input-account"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank">Bank Name</Label>
                      <Input
                        id="bank"
                        placeholder="Your bank"
                        data-testid="input-bank"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={processing}
                  data-testid="button-pay"
                >
                  {processing ? "Processing..." : `Pay R${parseFloat(link!.amount).toFixed(2)}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing this payment, you agree to our terms of service
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
