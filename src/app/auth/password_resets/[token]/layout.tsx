import AuthLayout from "../../_components/AuthLayout";
import { getLocale, getTranslations } from "next-intl/server";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { useOriginalPath } from "@/components/OriginalPathProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const user = await getUser();
  const { navigateToOriginalPath } = useOriginalPath();
  if (user) {
    navigateToOriginalPath(false);
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
