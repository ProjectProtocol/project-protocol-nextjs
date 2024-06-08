import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const ALL_LOCALES = ["en-US", "es-MX"];

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // https://next-intl-docs.vercel.app/docs/getting-started
  // const locale = "en-US";
  const cookieStore = cookies();
  let locale = cookieStore.get("NEXT_LOCALE")?.value || "en-US";

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
