import AuthLayout from "./_components/AuthLayout";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <AuthLayout locale={locale} pageTitle={t("login.loginTitle")}>
      {children}
    </AuthLayout>
  );
}
