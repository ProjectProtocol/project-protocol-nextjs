import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { ALL_LOCALES, defaultLocale } from "./config";

export const routing = defineRouting({
  locales: ALL_LOCALES,
  defaultLocale,
});

// Should only be used on public routes in the `[locale]` segment
export const { Link, usePathname, useRouter, redirect } =
  createSharedPathnamesNavigation(routing);
