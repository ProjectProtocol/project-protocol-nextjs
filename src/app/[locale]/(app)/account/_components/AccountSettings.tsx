"use client";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AccountSettingsRow from "./AccountSettingsRow";
import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { destroySession } from "@/lib/session";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import toast from "react-hot-toast";
import User from "@/types/User";
import { resendConfirmation } from "@/lib/actions/account";
import AsyncButton from "@/components/AsyncButton";
import { useAuth } from "@/components/AuthProvider";

export default function AccountSettings() {
  const authInfo = useAuth();
  const user = authInfo.user as User;
  const tAccount = useTranslations("account");
  const tShared = useTranslations("shared");
  console.log(user);

  const [resentCode, setResentCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const signOut = async () => {
    await destroySession();
    toast.success(tAccount("signOutSuccess"));
  };

  const requestConfirmationCode = async () => {
    setLoading(true);
    const success = await resendConfirmation();
    if (success) {
      setResentCode(true);
    } else {
      toast.error(tShared("genericError"));
    }
    setLoading(false);
  };

  return (
    <Row className="gy-4 mt-5">
      {!user.isConfirmed && (
        <>
          <AccountSettingsRow
            title={tAccount("confirm")}
            detail={tAccount("confirmDetail", {
              email: user.email,
            })}
            action={
              resentCode ? (
                <p>
                  {tAccount("confirmationSent")}
                  <i className="bi bi-check-circle text-success ms-2" />
                </p>
              ) : (
                <AsyncButton
                  className="btn btn-primary btn-sm"
                  role="button"
                  onClick={requestConfirmationCode}
                  loading={loading}
                >
                  {tAccount("resendCode")}
                </AsyncButton>
              )
            }
          />
          <Col xs={12}>
            <hr />
          </Col>
        </>
      )}
      <AccountSettingsRow
        title={tShared("email")}
        detail={user.email}
        action={
          <Button variant="outline-dark" size="sm" onClick={signOut}>
            {tAccount("signOut")}
          </Button>
        }
      />
      <AccountSettingsRow
        title={tAccount("changePassword.title")}
        detail={tAccount("changePassword.title")}
        action={
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => setShowChangePassword(true)}
          >
            {tAccount("changePassword.action")}
          </Button>
        }
      />
      <AccountSettingsRow
        title={tAccount("delete.title")}
        detail={tAccount("delete.detail")}
        action={
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShowDeleteAccount(true)}
          >
            <i className="bi bi-trash me-2" />
            {tAccount("delete.action")}
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
    </Row>
  );
}
