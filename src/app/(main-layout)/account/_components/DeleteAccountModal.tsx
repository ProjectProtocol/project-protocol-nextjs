"use client";

import { useTranslations } from "next-intl";
import PopUp, { IPopUp } from "@/components/PopUp";
import AsyncButton from "@/components/AsyncButton";
import { Button } from "react-bootstrap";
import { deleteAccount } from "@/lib/actions/account";
import { useFormState } from "react-dom";
import { getErrorState } from "@/lib/forms";
import Input from "@/components/Input";
import { useEffect } from "react";

interface IDeleteAccountModal {
  onHide: () => void;
  closeButton?: boolean;
}

const initialState = {
  error: undefined,
  password: "",
  errors: {},
};

export default function DeleteAccountModal({
  onHide,
  closeButton,
  ...popUpProps
}: IDeleteAccountModal & IPopUp) {
  const t = useTranslations();
  const [state, formAction] = useFormState(deleteAccount, initialState);

  useEffect(() => {
    if (!state?.error && !state?.errors) {
      onHide();
    }
  }, [state]);

  return (
    <PopUp
      title={t("account.delete.title")}
      {...popUpProps}
      closeButton
      onHide={onHide}
    >
      <form className="vertical-rhythm" action={formAction}>
        <p>{t("account.delete.confirmMessage")}</p>
        <p>{t("account.delete.enterPassword")}</p>
        <Input
          type="password"
          name="password"
          label={t("account.delete.password")}
          placeholder={t("account.delete.password")}
          {...getErrorState("password", state?.errors)}
        />
        <div className="d-flex flex-row justify-content-between mt-4">
          <Button variant="outline-dark" onClick={onHide}>
            {t("shared.cancel")}
          </Button>
          <AsyncButton type="submit" variant="danger">
            {t("account.delete.submit")}
          </AsyncButton>
        </div>
      </form>
    </PopUp>
  );
}
