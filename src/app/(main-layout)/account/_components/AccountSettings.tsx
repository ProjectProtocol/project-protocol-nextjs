"use client";

import { Row } from "react-bootstrap";
import AccountSettingsRow from "./AccountSettingsRow";
import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { destroySession } from "@/lib/session";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountSettings() {
  const { user } = useAuth();
  const t = useTranslations();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const signOut = async () => {
    await destroySession();
  };

  return (
    <Row className="gy-4 mt-5">
      {user && (
        <>
          <AccountSettingsRow
            title={t("shared.email")}
            detail={user.email}
            action={
              <Button variant="outline-dark" size="sm" onClick={signOut}>
                {t("account.signOut")}
              </Button>
            }
          />
          <AccountSettingsRow
            title={t("account.changePassword.title")}
            detail={t("account.changePassword.title")}
            action={
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => setShowChangePassword(true)}
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
                onClick={() => setShowDeleteAccount(true)}
              >
                <i className="bi bi-trash me-2" />
                {t("account.delete.action")}
              </Button>
            }
          />
          <ChangePasswordModal
            show={showChangePassword}
            onHide={() => setShowChangePassword(false)}
            closeButton
          />
          <DeleteAccountModal
            show={showDeleteAccount}
            onHide={() => setShowDeleteAccount(false)}
            closeButton
          />
        </>
      )}
    </Row>
  );
}
