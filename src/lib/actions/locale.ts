"use server";

import { cookies } from "next/headers";

export async function switchLanguage({
  locale,
}: {
  locale: "en-US" | "es-MX";
}) {
  const store = cookies();
  const currentNextLocale = store.get("NEXT_LOCALE");
  if (currentNextLocale?.value != locale) {
    await store.set("NEXT_LOCALE", locale);
  }
}
