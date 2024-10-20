import PageHeader from "@/components/PageHeader";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import AccountSettings from "./_components/AccountSettings";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });
  return { title: t("account.title") };
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div>
      <PageHeader title={t("account.title")} showBack />
      <AccountSettings />
    </div>
  );
}
