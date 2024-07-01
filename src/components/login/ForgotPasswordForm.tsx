"use client";
import Input from "../Input";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import AsyncButton from "../AsyncButton";
import { getErrorState } from "@/lib/forms";
import { resetPassword } from "@/lib/actions/account";

const initialState = {
  error: undefined,
  email: "",
  errors: {},
};

export default function ForgotPasswordForm() {
  const t = useTranslations();
  const [state, formAction] = useFormState(resetPassword, initialState);

  return (
    <div className="d-block p-4">
      <div className="text-center mb-3">
        {t("login.forgotPasswordTitleHelper")}
      </div>
      {state?.error && (
        <div className="alert alert-danger" role="alert">
          {t("shared.genericError")}
        </div>
      )}
      <form className="vertical-rhythm" action={formAction}>
        <Input
          type="email"
          name="email"
          label={t("login.email")}
          placeholder={t("login.emailPlaceholder")}
          {...getErrorState("email", state?.errors)}
        />
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
        >
          {t("login.resetPassword.submit")}
        </AsyncButton>
        <div>
          {t("login.loginHelper")}
          <a className="link ms-1" href="/login/signup">
            {t("login.signup")}
          </a>
        </div>
      </form>
    </div>
  );
}
