import { useAuth } from "@/lib/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        if (location !== "/signin") {
          setLocation("/signin");
        }
      } else {
        const isAdmin = user.isAdmin || user.role?.toLowerCase() === "admin";
        if (!isAdmin) {
          if (location !== "/unauthorized") {
            setLocation("/unauthorized");
          }
        }
      }
    }
  }, [user, loading, location, setLocation]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // Prevent rendering until redirect resolves
  }

  const isAdmin = user.isAdmin || user.role?.toLowerCase() === "admin";
  if (!isAdmin) {
    return null; // Prevent rendering until redirect resolves
  }

  return <>{children}</>;
}
