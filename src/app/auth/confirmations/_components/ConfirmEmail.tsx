"use client";

import { useAuth } from "@/components/AuthProvider";
import { useOriginalPath } from "@/components/OriginalPathProvider";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ConfirmEmail() {
  const t = useTranslations();
  const { user } = useAuth();
  const { getOriginalPath } = useOriginalPath();

  return (
    <div className="d-block p-4">
      <div className="text-center mb-3">{t("login.confirmSignupTitle")}</div>
      <p>
        {t.rich("login.loginConfirmSignupDetail1", {
          email: user!.email,
          b: (chunks) => <b>{chunks}</b>,
        })}
      </p>
      <p>{t("login.loginConfirmSignupDetail2")}</p>
      <div className="text-center mt-5">
        <Link
          className="btn btn-primary"
          href={getOriginalPath()}
          replace={true}
        >
          {t("shared.OK")}
        </Link>
      </div>
      <div className="text-center mt-5">
        <Link href="/content/en-US/terms-of-service" className="link">
          {t("navigation.termsOfService")}
        </Link>
      </div>
    </div>
  );
}
