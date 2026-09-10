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
  const [, navigate] = useLocation();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      }
      if (data.user) {
        // Create a corresponding merchant document in Supabase
        const { error: merchantError } = await supabase
          .from('merchants')
          .insert([{ id: data.user.id, email: data.user.email, businessName: 'My Business' }]);
        if (merchantError) throw merchantError;
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError("Failed to create an account. Please try again.");
      console.error("Supabase SignUp Error:", err);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <img src="/paymerch.png" alt="Brand logo" className="h-24 w-auto object-contain" />
          </div>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Get started with accepting payments globally.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (min. 6 characters)</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p>
            Already have an account?&nbsp;
            <Link href="/signin" className="text-primary hover:underline">Sign In</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
