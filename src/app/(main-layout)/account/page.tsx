import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import { getUser, destroySession } from "@/lib/session";
import { redirect } from "next/navigation";
import AccountSettingsRow from "./_components/AccountSettingsRow";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default async function Page() {
  const user = await getUser();
  const t = await getTranslations();

  if (!user) {
    redirect("/");
  }

  async function handleSignOut() {
    "use server";
    return await destroySession();
  }

  return (
    <div>
      <PageHeader title={t("account.title")} showBack />
      <Row className="gy-4 mt-5">
        <AccountSettingsRow
          title={t("shared.email")}
          detail={user.email}
          action={
            <Button variant="outline-dark" size="sm" onClick={handleSignOut}>
              {t("account.signOut")}
            </Button>
          }
        ></AccountSettingsRow>
      </Row>
    </div>
  );
}
