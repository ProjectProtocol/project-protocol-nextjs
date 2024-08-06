import { getLocale, getTranslations } from "next-intl/server";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginLayout from "@/components/login/LoginLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const user = await getUser();
  if (user) {
    redirect("/");
  }

  return <LoginLayout locale={locale}>{children}</LoginLayout>;
}
