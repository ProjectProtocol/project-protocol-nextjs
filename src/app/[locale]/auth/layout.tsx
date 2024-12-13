import { ALL_LOCALES } from "@/i18n/config";
import AuthLayout from "./_components/AuthLayout";
import { getLocale, setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  return ALL_LOCALES.map((locale) => ({ locale }));
}

export default async function Layout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <AuthLayout locale={locale} pageTitle={t("login.loginTitle")}>
      {children}
    </AuthLayout>
  );
}
