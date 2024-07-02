"use client";

import { FlashMessage } from "@/lib/flash-messages";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function FlashMessages({
  messages,
}: {
  messages: FlashMessage[];
}) {
  useEffect(() => {
    const toastFn = { success: toast.success, error: toast.error };
    messages.forEach((message) => {
      toastFn[message.type](message.message, { id: message.id });
    });
  });

  return null;
}
