import AuthLayout from "../../_components/AuthLayout";
import { getLocale, getTranslations } from "next-intl/server";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

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

  return (
    <AuthLayout
      locale={locale}
      pageTitle={t("password_reset.newPassword.title")}
    >
      {children}
    </AuthLayout>
  );
}
