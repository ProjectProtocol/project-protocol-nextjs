"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ConfirmEmail({ email }: { email: string }) {
  const t = useTranslations();
  const callbackURL = useSearchParams().get("callbackURL") ?? "/rate-my-po";

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
        <Link className="btn btn-primary" href={callbackURL}>
          {t("shared.OK")}
        </Link>
      </div>
      <div className="text-center mt-5">
        <Link href="/terms-of-service" className="link">
          {t("navigation.termsOfService")}
        </Link>
      </div>
    </div>
  );
}