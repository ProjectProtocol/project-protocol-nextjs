"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type OriginalPathProviderValue = {
  getOriginalPath: () => string;
  redirectToOriginalPath: () => void;
};

export const OriginalPathContext = createContext<
  OriginalPathProviderValue | undefined
>(undefined);

const redirectRoutes = ["/auth"];

function isRedirectRoute(path: string): boolean {
  for (const n of redirectRoutes) {
    if (path.startsWith(n)) {
      return true;
    }
  }
  return false;
}

export default function OriginalPathProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [originalPath, setOriginalPath] = useState<string>();
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    // If path is in namespace
    if (isRedirectRoute(pathname)) {
      if (!originalPath) {
        console.log("Start");
        setOriginalPath(prevPath);
      }
    } else {
      console.log("Clear");
      setOriginalPath(undefined);
      setPrevPath(pathname);
    }
  }, [prevPath, pathname, originalPath]);

  function redirectToOriginalPath() {
    router.replace(originalPath || "/");
  }

  function getOriginalPath(): string {
    return originalPath || "/";
  }

  const value = {
    getOriginalPath,
    redirectToOriginalPath,
  };

  return (
    <OriginalPathContext.Provider value={value}>
      {children}
    </OriginalPathContext.Provider>
  );
}

export function useOriginalPath() {
  const context = useContext(OriginalPathContext);
  if (context === undefined) {
    throw new Error(
      "useOriginalPath must be used with an OriginalPathProvider"
    );
  }
  return context;
}
