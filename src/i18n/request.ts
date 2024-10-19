import { getRequestConfig } from "next-intl/server";
import defaultMessages from "../locales/en-US.json";
import deepmerge from "deepmerge";
import { notFound } from "next/navigation";
import { ALL_LOCALES } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!ALL_LOCALES.includes(locale as any)) {
    notFound();
  }
  const localeMessages = (await import(`../locales/${locale}.json`)).default;

  return {
    messages: deepmerge(defaultMessages, localeMessages),
  };
});
