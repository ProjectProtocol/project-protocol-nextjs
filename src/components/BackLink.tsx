"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface BackLinkProps {
  children: React.ReactNode;
}

export default function BackLink({
  children,
  ...rest
}: BackLinkProps & React.HTMLAttributes<HTMLAnchorElement>) {
  const router = useRouter();
  return (
    <a role="button" {...rest} onClick={() => router.back()}>
      {children}
    </a>
  );
}
