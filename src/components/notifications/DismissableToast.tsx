"use client";

import { FlashMessage } from "@/lib/flash-messages";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export default function DismissableToast({
  flashMessage,
}: {
  flashMessage: FlashMessage;
}) {
  const t = useTranslations();
  const { message, id } = flashMessage;
  return (
    <span>
      {message}{" "}
      <a className="text-white" role="button" onClick={() => toast.dismiss(id)}>
        {t("shared.dismiss")}
      </a>
    </span>
  );
}
