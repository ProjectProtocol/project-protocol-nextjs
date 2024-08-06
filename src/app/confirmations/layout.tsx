import { getLocale, getTranslations } from "next-intl/server";
import LoginLayout from "@/components/login/LoginLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();
  const locale = await getLocale();

  return <LoginLayout locale={locale}>{children}</LoginLayout>;
}
