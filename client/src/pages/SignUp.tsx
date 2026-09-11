// client/src/pages/SignUp.tsx
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient"; 

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!supabase) {
        // Demo mode - simulate successful signup
        localStorage.setItem('demoUser', JSON.stringify({ email, isAdmin: email === 'admin@paymerch.com' }));
        if (email === 'admin@paymerch.com') {
          navigate("/admin");
        } else {
          navigate("/merchant");
        }
        return;
      }

      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      }
      if (data.user) {
        // Create a corresponding merchant document in Supabase
        try {
          const { error: merchantError } = await supabase
            .from('merchants')
            .insert([{ id: data.user.id, email: data.user.email, businessName: 'My Business' }]);
          if (merchantError) {
            console.error("Merchant creation error:", merchantError);
            // Continue anyway - merchant creation might fail due to permissions
          }
        } catch (merchantErr) {
          console.error("Merchant creation error:", merchantErr);
        }
      }
      // Show success message if email confirmation is required
      if (data.user && !data.session) {
        setError("Account created! Please check your email to confirm your account.");
        setLoading(false);
        return;
      }
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create an account. Please try again.";
      setError(errorMessage);
      console.error("Supabase SignUp Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30">
      <Card className="w-full max-w-md shadow-lg border-2">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <img src="/paymerch_icon.png" alt="Brand logo" className="h-[60px] w-auto object-contain sm:h-[80px]" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Create your account</CardTitle>
          <CardDescription className="text-sm sm:text-base">Get started with accepting payments globally</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                autoComplete="email"
                placeholder="your@email.com"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text font-medium">Password (min. 6 characters)</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                autoComplete="new-password"
                placeholder="••••••••"
                className="h-12"
              />
            </div>
            {error && (
              <div className={`p-3 rounded-lg text-sm ${error.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?&nbsp;
            <Link href="/signin" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
