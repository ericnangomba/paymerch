// client/src/pages/SignIn.tsx
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!supabase) {
        // Demo mode - check admin credentials
        if (email === 'admin@paymerch.com' && password === 'password') {
          localStorage.setItem('demoUser', JSON.stringify({ email, isAdmin: true }));
          localStorage.setItem("authToken", "demo-admin-token");
          navigate("/admin");
          return;
        }
        // For demo mode, allow any credentials
        localStorage.setItem('demoUser', JSON.stringify({ email, isAdmin: false }));
        localStorage.setItem("authToken", "demo-merchant-token");
        navigate("/merchant");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
      console.error("Supabase SignIn Error:", err);
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
          <CardTitle className="text-2xl sm:text-3xl">Sign In</CardTitle>
          <CardDescription className="text-sm sm:text-base">Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
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
              <Label htmlFor="password" className="text font-medium">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-12"
              />
            </div>
            {error && (
              <div className="p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium" 
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?&nbsp;
            <Link href="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}