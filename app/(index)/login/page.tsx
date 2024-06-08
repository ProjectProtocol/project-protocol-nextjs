import { auth } from "@/app/actions/auth";
import LoginUI from "@/src/components/LoginModal/LoginUI";
import PageHeader from "@/src/components/PageHeader";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const t = await getTranslations();
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <PageHeader title={t("account.loginModal.loginTitle")} showBack />
      <LoginUI />
    </div>
  );
}
