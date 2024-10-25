"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "@/i18n/routing";
import { confirmAccount } from "@/lib/actions/auth";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

export default function ConfirmationSpinner({ token }: { token: string }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const t = useTranslations();
  const [confirmAttempted, setConfirmAttempted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function accountConfirmation() {
    try {
      const { data } = await confirmAccount(token);
      if (data) {
        setUser(data);
      }
      toast.success(t("account.confirmation.success"), {
        id: "confirmation-toast",
      });
    } catch (e) {
      toast.error(t("account.confirmation.error"), {
        id: "confirmation-toast",
      });
    } finally {
      router.replace("/rate-my-po");
    }
  }
  useEffect(() => {
    if (!confirmAttempted) {
      setConfirmAttempted(true);
      accountConfirmation();
    }
  }, [confirmAttempted, setConfirmAttempted, accountConfirmation]);

  return (
    <div className="text-center vertical-rhythm">
      <p>{t("account.confirmation.loading")}</p>
      <Spinner />
    </div>
  );
}
