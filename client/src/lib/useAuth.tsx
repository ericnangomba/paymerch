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

      // ✅ Redirect based on role
      if (newUser.isAdmin) {
        setLocation("/admin");
      } else if (normalizedRole === "merchant") {
        setLocation("/merchant");
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
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Supabase auth state change event:", event);
      console.log("Session data on auth state change:", session);
      fetchMe();
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchMe]);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/signin";
  };

  return { user, loading, refresh: fetchMe, logout };
}
