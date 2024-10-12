import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import defaultMessages from "../locales/en-US.json";
import deepmerge from "deepmerge";
import { notFound } from "next/navigation";
import { ALL_LOCALES } from "./config";

// Mixed routing example: https://github.com/amannn/next-intl/blob/main/examples/example-app-router-mixed-routing/src/i18n/request.ts
const COOKIE_NAME = "NEXT_LOCALE";
async function getLocaleMessages(locale: string) {
  if (!ALL_LOCALES.includes(locale as any)) {
    notFound();
  }

  const localeMessages = (await import(`./locales/${locale}.json`)).default;
  return {
    messages: deepmerge(defaultMessages, localeMessages),
  };
}

function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || "en-US";
}

export default getRequestConfig(async (params) => {
  const isCookieRoute = headers().get("x-noprefix-route") === "true";

  if (isCookieRoute) {
    console.log("Cookie route, hon");
    const locale = await getUserLocale();
    return {
      locale,
      ...(await getLocaleMessages(locale)),
    };
  } else {
    console.log("Luh-oh!!!! No cookie route!");

    return getLocaleMessages(params.locale);
  }
});
