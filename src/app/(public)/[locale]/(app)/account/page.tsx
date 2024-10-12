import PageHeader from "@/components/PageHeader";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import AccountSettings from "./_components/AccountSettings";
import { Metadata } from "next";
import { metaTitle } from "@/lib/metadataUtils";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: metaTitle(t("title")) };
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
