import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import AccountSettings from "./_components/AccountSettings";

export default async function Page() {
  const user = await getUser();
  const t = await getTranslations();

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <PageHeader title={t("account.title")} showBack />
      <AccountSettings></AccountSettings>
    </div>
  );
}
