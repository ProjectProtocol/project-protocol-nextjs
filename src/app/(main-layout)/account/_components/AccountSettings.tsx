"use client";
import { Row } from "react-bootstrap";
import AccountSettingsRow from "./AccountSettingsRow";
import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { destroySession } from "@/lib/session";
import { useAuth } from "@/components/AuthProvider";

export default function AccountSettings() {
  const { user } = useAuth();
  const t = useTranslations();

  const signOut = async () => {
    await destroySession();
  };

  return (
    <Row className="gy-4 mt-5">
      {user && (
        <AccountSettingsRow
          title={t("shared.email")}
          detail={user.email}
          action={
            <Button variant="outline-dark" size="sm" onClick={signOut}>
              {t("account.signOut")}
            </Button>
          }
        />
      )}
    </Row>
  );
}
