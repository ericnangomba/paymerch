import { useAuth } from "@/lib/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      if (location !== "/signin") {
        setLocation("/signin");
      }
    } else {
      const normalizedRole = user.role?.toLowerCase();
      if (normalizedRole !== "admin") {
        if (location !== "/unauthorized") {
          setLocation("/unauthorized");
        }
      }
    }
  }, [user, location, setLocation]);

  if (!user || user.role?.toLowerCase() !== "admin") {
    return null; // Prevent rendering until redirect resolves
  }

  return <>{children}</>;
}
