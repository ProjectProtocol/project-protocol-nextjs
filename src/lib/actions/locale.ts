"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function switchLanguage({
  locale,
  pathname,
}: {
  locale: "en-US" | "es-MX";
  pathname: string;
}) {
  const store = cookies();
  const currentNextLocale = store.get("NEXT_LOCALE");
  if (currentNextLocale?.value != locale) {
    await store.set("NEXT_LOCALE", locale);
  }
  redirect(pathname);
}
