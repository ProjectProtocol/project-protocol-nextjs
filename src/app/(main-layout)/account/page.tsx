import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import { destroySession, getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import AccountSettingsRow from "./_components/AccountSettingsRow";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { resendConfirmation } from "@/lib/actions/account";

export default async function Page() {
  const user = await getUser();
  const t = await getTranslations();

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <PageHeader title={t("account.title")} showBack />
      <Row className="gy-4 mt-5">
        <AccountSettingsRow
          title={t("shared.email")}
          detail={user.email}
          action={
            <Button variant="outline-dark" size="sm" onClick={() => {}}>
              {t("account.signOut")}
            </Button>
          }
        ></AccountSettingsRow>
        <AccountSettingsRow
          title={t("account.changePassword.title")}
          detail={t("account.changePassword.title")}
          action={
            <Button
              variant="outline-dark"
              size="sm"
              title="Change password"
              onClick={() => {}}
            >
              {t("account.changePassword.action")}
            </Button>
          }
        />
        <AccountSettingsRow
          title={t("account.delete.title")}
          detail={t("account.delete.detail")}
          action={
            <Button
              variant="outline-danger"
              size="sm"
              title={t("account.delete.title")}
              onClick={() => {}}
            >
              <i className="bi bi-trash me-2" />
              {t("account.delete.action")}
            </Button>
          }
        />
      </Row>
    </div>
  );
}
