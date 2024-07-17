"use client";

import { useTranslations } from "next-intl";
import PopUp, { IPopUp } from "@/components/PopUp";
import { useFormState } from "react-dom";
import { changePassword } from "@/lib/actions/account";
import Input from "@/components/Input";
import AsyncButton from "@/components/AsyncButton";
import { getErrorState } from "@/lib/forms";
import { useEffect } from "react";

interface ICHangePasswordModal {
  onHide: () => void;
  closeButton?: boolean;
}

const initialState = {
  error: undefined,
  password: "",
  newPassword: "",
  newPasswordConfirm: "",
  errors: {},
};

export default function ChangePasswordModal({
  onHide,
  closeButton,
  ...popUpProps
}: ICHangePasswordModal & IPopUp) {
  const t = useTranslations();
  const [state, formAction] = useFormState(changePassword, initialState);

  useEffect(() => {
    if (!state?.error && !state?.errors) {
      onHide();
    }
  }, [state]);

  return (
    <PopUp
      title={t("account.changePassword.title")}
      {...popUpProps}
      closeButton
      onHide={onHide}
    >
      {state?.error && (
        <div className="alert alert-danger" role="alert">
          {t("account.changePassword.error")}
        </div>
      )}
      <form className="vertical-rhythm" action={formAction}>
        <p>{t("account.changePassword.intro")}</p>
        <Input
          type="password"
          name="password"
          label={t("account.changePassword.currentPassword")}
          placeholder={t("account.changePassword.currentPassword")}
          {...getErrorState("password", state?.errors)}
        />
        <hr />
        <p>{t("password_reset.modal.intro")}</p>
        <Input
          type="password"
          name="newPassword"
          label={t("account.changePassword.newPassword")}
          placeholder={t("account.changePassword.newPassword")}
          {...getErrorState("newPassword", state?.errors)}
        />
        <Input
          type="password"
          name="newPasswordConfirm"
          label={t("account.changePassword.newPasswordConfirm")}
          placeholder={t("account.changePassword.newPasswordConfirm")}
          {...getErrorState("newPasswordConfirm", state?.errors)}
        />
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
        >
          {t("account.changePassword.action")}
        </AsyncButton>
      </form>
    </PopUp>
  );
}
