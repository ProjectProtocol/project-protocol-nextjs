"use client";

import Input from "../Input";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import AsyncButton from "../AsyncButton";
import { login } from "@/lib/actions/auth";

type ErrorState = {
  error?: string;
  isInvalid: boolean;
};
function getErrorState(fieldName: string, errors: any): ErrorState {
  return {
    error: errors?.[fieldName],
    isInvalid: !!errors?.[fieldName],
  };
}

const initialState = {
  error: undefined,
  errors: {},
};

export default function LoginForm({ callbackURL }: { callbackURL?: string }) {
  const t = useTranslations();
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="d-block p-4">
      <div className="text-center mb-3">{t("login.loginTitleHelper")}</div>
      <form className="vertical-rhythm" action={formAction}>
        <input type="hidden" name="callbackURL" value={callbackURL} />
        <Input
          size="lg"
          controlId={`login-email`}
          label={t("login.email")}
          type="email"
          name="email"
          placeholder={t("login.emailPlaceholder")}
          {...getErrorState("email", state?.errors)}
        />
        <Input
          size="lg"
          controlId={"login-password"}
          label={t("login.password")}
          className="mb-2"
          type="password"
          name="password"
          {...getErrorState("password", state?.errors)}
        />
        <div>
          <a className="link" href="/login/forgot-password">
            {t("login.forgotPassword")}
          </a>
        </div>
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
        >
          {t("login.login")}
        </AsyncButton>
        <div className="text-center">
          {t("login.loginHelper")}
          <a className="link ms-1" href="/login/signup">
            {t("login.signup")}
          </a>
        </div>
      </form>
    </div>
  );
}
