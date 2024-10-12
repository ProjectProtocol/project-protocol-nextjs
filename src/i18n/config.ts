export const ALL_LOCALES = ["en-US", "es-MX"] as const;
export type Locale = (typeof ALL_LOCALES)[number];
export const defaultLocale: Locale = "en-US";

// Cookies/Header keys
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const NOPREFIX_HEADER = "x-noprefix-locale";
