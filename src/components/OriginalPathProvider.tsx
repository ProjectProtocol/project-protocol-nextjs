"use client";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

export const OriginalPathContext = createContext({});

export default function OriginalPathProvider({
  children,
  namespace,
  url,
}: {
  children: React.ReactNode;
  namespace?: string;
  url?: string;
}) {
  const [originalPath, setOriginalPath] = useState<[string?, string?]>([
    namespace,
    url,
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

  return (
    <OriginalPathContext.Provider
      value={{
        originalPath,
        setOriginalPath,
        navigateToOriginalPath,
        clearOriginalPath,
      }}
    >
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
