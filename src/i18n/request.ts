import { getRequestConfig } from "next-intl/server";
import defaultMessages from "../locales/en-US.json";
import deepmerge from "deepmerge";
import { notFound } from "next/navigation";
import { ALL_LOCALES } from "./config";

// Mixed routing example: https://github.com/amannn/next-intl/blob/main/examples/example-app-router-mixed-routing/src/i18n/request.ts
async function getLocaleMessages(locale: string) {
  if (!ALL_LOCALES.includes(locale as any)) {
    notFound();
  }

  const localeMessages = (await import(`../locales/${locale}.json`)).default;
  return {
    messages: deepmerge(defaultMessages, localeMessages),
  };
}

export default getRequestConfig(async ({ locale }) => {
  return getLocaleMessages(locale);
});
