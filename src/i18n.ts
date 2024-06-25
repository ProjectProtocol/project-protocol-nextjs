import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import defaultMessages from "./locales/en-US.json";
import { get } from "http";

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
  const messages = { ...defaultMessages, ...localeMessages };

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

export async function switchLanguage() {
  const store = cookies();
  const currentNextLocale = store.get("NEXT_LOCALE");
  const newLocale = currentNextLocale?.value === "en-US" ? "es-MX" : "en-US";
  await store.set("NEXT_LOCALE", newLocale);
}
