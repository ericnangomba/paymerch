import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabaseClient";
import { useLocation } from "wouter";

export type AuthUser = {
  uid: string;
  email?: string | null;
  isAdmin: boolean;
  token: string;
  role: string;
} | null;

// Function to refresh and store token safely
export async function refreshAndStoreToken() {
  if (!supabase) {
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      const user = JSON.parse(demoUser);
      localStorage.setItem("authToken", "demo-token");
      return "demo-token";
    }
    return null;
  }
  
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Failed to get session", error);
    localStorage.removeItem("authToken");
    return null;
  }

  const session = data?.session ?? null;
  const accessToken = session?.access_token ?? null;

  if (accessToken && accessToken !== "null" && accessToken !== "undefined") {
    localStorage.setItem("authToken", accessToken);
    return accessToken;
  } else {
    localStorage.removeItem("authToken");
    return null;
  }
}

// Safe fetch helper function
export async function safeFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("authToken");
  const headers = new Headers(options.headers || { "Content-Type": "application/json" });

  if (token && token !== "null" && token !== "undefined") {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    headers.delete("Authorization");
  }

  const opts = { ...options, headers };
  return fetch(url, opts);
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  const fetchMe = useCallback(async () => {
    try {
      // Check for demo mode first
      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        const parsedUser = JSON.parse(demoUser);
        const newUser: AuthUser = {
          uid: parsedUser.email || 'demo-user',
          email: parsedUser.email,
          isAdmin: parsedUser.isAdmin || false,
          token: 'demo-token',
          role: parsedUser.isAdmin ? 'admin' : 'merchant',
        };
        setUser(newUser);
        localStorage.setItem("authToken", "demo-token");
        setLoading(false);
        
        // Don't auto-redirect in demo mode - let the user navigate
        return;
      }

      if (!supabase) {
        setUser(null);
        setLoading(false);
        return;
      }

      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
      if (!accessToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const normalizedRole = data.role?.toLowerCase() || "merchant";

      // Check for pre-created admin credentials
      const isAdminUser = data.email === "admin@paymerch.com" && normalizedRole === "admin";

      const newUser: AuthUser = {
        uid: data.uid,
        email: data.email,
        isAdmin: isAdminUser || normalizedRole === "admin",
        token: accessToken,
        role: isAdminUser ? "admin" : normalizedRole,
      };

      setUser(newUser);
      localStorage.setItem("authToken", accessToken);

      // ✅ Redirect based on role (only if not on auth pages)
      const currentPath = window.location.pathname;
      const authPages = ["/signin", "/signup", "/"];
      if (!authPages.includes(currentPath)) {
        if (newUser.isAdmin && currentPath !== "/admin") {
          setLocation("/admin");
        } else if (normalizedRole === "merchant" && currentPath !== "/merchant" && currentPath !== "/dashboard") {
          setLocation("/merchant");
        }
      }
    } catch (err) {
      console.error("useAuth error", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setLocation]);

  useEffect(() => {
    fetchMe();
    if (supabase) {
      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("Supabase auth state change event:", event);
        console.log("Session data on auth state change:", session);
        fetchMe();
      });
      return () => {
        listener.subscription.unsubscribe();
      };
    }
  }, [fetchMe]);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("demoUser");
    window.location.href = "/signin";
  };

  return { user, loading, refresh: fetchMe, logout };
}
