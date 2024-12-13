import PageHeader from "@/components/PageHeader";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AccountSettings from "./_components/AccountSettings";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({ locale });
  return { title: t("account.title") };
}

export default async function Page(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div>
      <PageHeader title={t("account.title")} showBack />
      <AccountSettings />
    </div>
  );
}
