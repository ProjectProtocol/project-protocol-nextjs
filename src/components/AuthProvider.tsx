"use client";
import { createContext, useContext, useMemo, useState } from "react";
import User from "@/types/User";

type AuthProviderValue = {
  user?: User;
  isSignedIn: boolean;
  isPolicyAcknowledged: () => boolean;
  updateAcknowledgePolicy: () => void;
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
  const [policyAcknowledged, setPolicyAcknowledged] = useState(
    user?.isPolicyAcknowledged || false
  );

  function updateAcknowledgePolicy() {
    setPolicyAcknowledged(true);
  }

  function isPolicyAcknowledged(): boolean {
    return policyAcknowledged;
  }

  const value = {
    user,
    isSignedIn,
    isPolicyAcknowledged,
    updateAcknowledgePolicy,
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
