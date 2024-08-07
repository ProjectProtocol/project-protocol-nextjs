"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function ConfirmEmail({
  email,
  callbackURL,
}: {
  email: string;
  callbackURL?: string;
}) {
  const t = useTranslations();

  return (
    <div className="d-block p-4">
      <div className="text-center mb-3">{t("login.confirmSignupTitle")}</div>
      <p>
        {t.rich("login.loginConfirmSignupDetail1", {
          email: email,
          b: (chunks) => <b>{chunks}</b>,
        })}
      </p>
      <p>{t("login.loginConfirmSignupDetail2")}</p>
      <div className="text-center mt-5">
        <Button href={callbackURL || "/"}>{t("shared.OK")}</Button>
      </div>
      <div className="text-center mt-5">
        <Link href="/terms-of-service" className="link">
          {t("navigation.termsOfService")}
        </Link>
      </div>
    </div>
  );
}
