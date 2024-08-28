"use client";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

type OriginalPathProviderValue = {
  originalPath: [string?, string?];
  setOriginalPath: (path: [string?, string?]) => void;
  navigateToOriginalPath: (shouldReplace: boolean) => void;
  clearOriginalPath: () => void;
};

export const OriginalPathContext = createContext<
  OriginalPathProviderValue | undefined
>(undefined);

export default function OriginalPathProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [originalPath, setOriginalPath] = useState<[string?, string?]>([
    undefined,
    undefined,
  ]);

  const navigateToOriginalPath = (shouldReplace: boolean) => {
    const toUrl = originalPath[1] || "/";
    const router = useRouter();
    if (shouldReplace) {
      router.replace(toUrl);
    } else {
      router.push(toUrl);
    }
    setOriginalPath([undefined, undefined]);
  };

  const clearOriginalPath = () => {
    const pathname = usePathname();
    const namespace = originalPath[0];
    if (namespace && !pathname.startsWith(namespace)) {
      setOriginalPath([undefined, undefined]);
    }
  };

  const value = {
    originalPath,
    setOriginalPath,
    navigateToOriginalPath,
    clearOriginalPath,
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
