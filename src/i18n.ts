import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import defaultMessages from "./locales/en-US.json";
import deepmerge from "deepmerge";

export const ALL_LOCALES = ["en-US", "es-MX"];

// Fallback pattern see https://github.com/amannn/next-intl/blob/main/examples/example-app-router-playground/src/i18n.tsx
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // https://next-intl-docs.vercel.app/docs/getting-started
  // const locale = "en-US";
  const cookieStore = cookies();

  let locale = cookieStore.get("NEXT_LOCALE")?.value || "en-US";

  const localeMessages = (await import(`./locales/${locale}.json`)).default;
  const messages = deepmerge(defaultMessages, localeMessages);

  return {
    locale,
    messages,
    getMessageFallback({ key, namespace }) {
      return (
        "`getMessageFallback` called for " +
        [namespace, key].filter((part) => part != null).join(".")
      );
    },
  };
});
