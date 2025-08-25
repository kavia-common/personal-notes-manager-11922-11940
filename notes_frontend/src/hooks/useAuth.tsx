"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContextValue, AuthCredentials, User } from "@/types";
import { apiLogin, apiLogout, apiSignup, getStoredUser } from "@/lib/api";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    setUser(getStoredUser());
    setLoading(false);
  }, []);

  const login = useCallback(async (creds: AuthCredentials) => {
    setLoading(true);
    try {
      const u = await apiLogin(creds);
      setUser(u);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (creds: AuthCredentials) => {
    setLoading(true);
    try {
      const u = await apiSignup(creds);
      setUser(u);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, signup, logout }),
    [user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
