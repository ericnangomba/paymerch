import { ReactNode } from "react";
import { useAuth } from "@/lib/useAuth";
import Unauthorized from "@/pages/Unauthorized";

interface MerchantGuardProps {
  children: ReactNode;
}

export default function MerchantGuard({ children }: MerchantGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Allow access if user is authenticated (for demo mode)
  if (!user) {
    return <Unauthorized />;
  }

  // Admin users should not access merchant dashboard
  if (user.role === "admin") {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
