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

  if (!user || user.role !== "merchant") {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
