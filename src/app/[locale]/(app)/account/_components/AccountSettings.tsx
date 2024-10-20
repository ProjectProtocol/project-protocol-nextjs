"use client";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AccountSettingsRow from "./AccountSettingsRow";
import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import toast from "react-hot-toast";
import User from "@/types/User";
import { deleteAccount, resendConfirmation } from "@/lib/actions/account";
import AsyncButton from "@/components/AsyncButton";
import { useAuth } from "@/components/AuthProvider";
import { useOriginalPath } from "@/components/OriginalPathProvider";
import { signOut } from "@/lib/session";
import { useRouter } from "@/i18n/routing";

export default function AccountSettings() {
  const tAccount = useTranslations("account");
  const tShared = useTranslations("shared");
  const auth = useAuth();
  const router = useRouter();
  const { getOriginalPath } = useOriginalPath();
  const user = auth.user as User;
  const { setUser } = auth;

  const [resentCode, setResentCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleSignout = async () => {
    await signOut();
    router.replace(getOriginalPath());
    toast.success(tAccount("signOutSuccess"));
    setUser();
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

  async function handleDeleteAccount({ password }: { password: string }) {
    const { error } = await deleteAccount({ password });
    if (error) {
      toast.error(error);
    } else {
      router.replace(getOriginalPath());
      toast.success(tAccount("delete.success"));
      setUser();
    }
  }

  return user ? (
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
          <Button variant="outline-dark" size="sm" onClick={handleSignout}>
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
        handleDelete={handleDeleteAccount}
        onHide={() => setShowDeleteAccount(false)}
        closeButton
      />
    </Row>
  ) : null;
}
