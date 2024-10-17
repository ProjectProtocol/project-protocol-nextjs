import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import AccountSettings from "./_components/AccountSettings";
import { metaTitle } from "@/lib/metadataUtils";

export async function generateMetadata() {
  const t = await getTranslations();
  return { title: metaTitle(t("account.title")) };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <div>
      <PageHeader title={t("account.title")} showBack />
      <AccountSettings />
    </div>
  );
}
