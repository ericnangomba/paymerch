import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  email: string;
  role: string;
  organization_id: string;
}

export function useAuthProfile() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (user: User | undefined) => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role, organization_id")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Failed to fetch profile", error);
      setProfile(null);
    } else {
      setProfile(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        await fetchProfile(session?.user);
        setLoading(false);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [fetchProfile]);

  return { session, profile, loading };
}