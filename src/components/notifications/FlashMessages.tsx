"use client";

import { FlashMessage } from "@/lib/flash-messages";
import { useEffect } from "react";
import toast from "react-hot-toast";
import DismissableToast from "./DismissableToast";

export default function FlashMessages({
  messages,
}: {
  messages: FlashMessage[];
}) {
  useEffect(() => {
    const toastFn = { success: toast.success, error: toast.error };
    messages.forEach((toastProps) => {
      const { message, type, id, template, ...options }: FlashMessage =
        toastProps;

      const duration = template === "dismissable" ? Infinity : 4000;

      toastFn[type](() => getTemplate(toastProps), {
        id,
        duration,
        ...options,
      });
    });
  });

  return null;
}

function getTemplate(flashMessage: FlashMessage) {
  const { template } = flashMessage;
  switch (template) {
    case "dismissable":
      return <DismissableToast flashMessage={flashMessage} />;

    default:
      return flashMessage.message;
  }
}
