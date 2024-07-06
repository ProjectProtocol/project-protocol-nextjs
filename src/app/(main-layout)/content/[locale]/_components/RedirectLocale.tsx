"use client";

import { usePathname, useRouter } from "next/navigation";

type RedirectLocaleProps = {
  pathLocale: string;
  currentLocale: string;
};

export default function RedirectLocale({
  pathLocale,
  currentLocale,
}: RedirectLocaleProps) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathLocale !== currentLocale) {
    const correctLocalePath = pathname.replace(pathLocale, currentLocale);
    router.replace(correctLocalePath);
  }

  return null;
}
