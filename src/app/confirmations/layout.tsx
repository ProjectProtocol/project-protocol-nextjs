import { getLocale } from "next-intl/server";
import LoginLayout from "@/components/login/LoginLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return <LoginLayout locale={locale}>{children}</LoginLayout>;
}
