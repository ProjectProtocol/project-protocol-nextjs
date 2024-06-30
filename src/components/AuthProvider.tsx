"use client";
import { createContext, useContext, useMemo } from "react";
import User from "@/types/User";

type AuthProviderValue = {
  user?: User;
  isSignedIn: boolean;
};

const AuthContext = createContext<AuthProviderValue | undefined>(undefined);

export default function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User;
}) {
  const isSignedIn = useMemo(() => !!user, [user]);

  const value = {
    user,
    isSignedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }

  return context;
}
