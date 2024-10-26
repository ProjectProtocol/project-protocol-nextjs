"use client";

import User from "@/types/User";
import PopUp, { IPopUp } from "@/components/PopUp";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { resendConfirmation } from "@/lib/actions/account";
import toast from "react-hot-toast";

interface IConfirmationModal extends IPopUp {
  user?: User;
  resentCodeAt?: Date;
}

export default function ConfirmationModal({
  user,
  ...popUpProps
}: IConfirmationModal) {
  const [resentCodeAt, setResentCodeAt] = useState<Date>();
  const t = useTranslations();
  const requestConfirmationCode = async () => {
    const success = await resendConfirmation();
    if (success) {
      setResentCodeAt(new Date());
    } else {
      toast.error(t("shared.genericError"));
    }
  };

  return (
    <PopUp title={t("home.confirmationModal.title")} {...popUpProps}>
      {user && (
        <>
          <p>
            {t.rich("home.confirmationModal.body", {
              email: user.email,
              b: (chunks: React.ReactNode) => <b>{chunks}</b>,
            })}
          </p>

          {resentCodeAt ? (
            <p>
              <i className="bi bi-check-circle me-1 align-middle text-success" />
              {t("home.confirmationModal.confirmationSent")}
            </p>
          ) : (
            <p>
              <a
                role="button"
                className="link"
                onClick={requestConfirmationCode}
              >
                {t("home.confirmationModal.resendLink")}
              </a>
            </p>
          )}
          <div className="text-center mt-5">
            <Link href="/content/terms-of-service" className="link">
              {t("navigation.termsOfService")}
            </Link>
          </div>
        </>
      )}
    </PopUp>
  );
}
