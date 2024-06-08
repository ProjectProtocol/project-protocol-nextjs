"use client";

import LoginForm from "./LoginForm";
import { useTranslations } from "next-intl";

// A wrapper for the forms to log in, sign up, and reset password
export default function LoginUI() {
  const t = useTranslations();
  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">{t("login.loginTitleHelper")}</h2>
      <LoginForm submitLabel={t("login.login")} />
    </div>
  );
}
