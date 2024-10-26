"use client";

import { useAuth } from "@/components/AuthProvider";
import { useOriginalPath } from "@/components/OriginalPathProvider";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ConfirmEmail() {
  const { user } = useAuth();
  const t = useTranslations();
  const { getOriginalPath } = useOriginalPath();

  if (!user?.email) {
    return null;
  }

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
        <Link href="/content/terms-of-service" className="link">
          {t("navigation.termsOfService")}
        </Link>
      </div>
    </div>
  );
}
