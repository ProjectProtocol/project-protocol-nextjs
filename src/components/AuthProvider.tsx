"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import User from "@/types/User";

type AuthProviderValue = {
  user?: User;
  setUser: (user: User) => void;
  isSignedIn: boolean;
  isPolicyAcknowledged: () => boolean;
  updateAcknowledgePolicy: () => void;
};

const AuthContext = createContext<AuthProviderValue | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>();
  const [firstLoad, setFirstLoad] = useState(true);
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

  useEffect(() => {
    if (firstLoad && !user) {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .finally(() => {
          setFirstLoad(false);
        });
    }
  }, [firstLoad, user]);

  const value = {
    user,
    setUser,
    isSignedIn,
    isPolicyAcknowledged,
    updateAcknowledgePolicy,
  };

  return (
    <AuthContext.Provider value={value}>
      {!firstLoad && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }

  return context;
}
