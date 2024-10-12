export const ALL_LOCALES = ["en-US", "es-MX"] as const;

export const defaultLocale: Locale = "en-US";

export type Locale = (typeof ALL_LOCALES)[number];
