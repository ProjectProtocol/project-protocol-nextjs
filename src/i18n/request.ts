import defaultMessages from "../locales/en-US.json";
import deepmerge from "deepmerge";
import { ALL_LOCALES } from "./config";
import { routing } from "./routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !ALL_LOCALES.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const localeMessages = (await import(`../locales/${locale}.json`)).default;

  return {
    locale,
    messages: deepmerge(defaultMessages, localeMessages),
  };
});
