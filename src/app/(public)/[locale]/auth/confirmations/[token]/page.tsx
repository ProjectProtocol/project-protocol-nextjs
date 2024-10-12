"use client";

import { confirmAccount } from "@/lib/actions/auth";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({
  params: { token, locale },
}: {
  params: { token: string; locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const router = useRouter();
  async function accountConfirmation() {
    try {
      await confirmAccount(token);

      toast.success(t("account.confirmation.success"));
    } catch (e) {
      toast.error(t("account.confirmation.error"));
    } finally {
      router.replace("/rate-my-po");
    }
  }

  useEffect(() => {
    accountConfirmation();
  });

  return (
    <div className="text-center vertical-rhythm">
      <p>{t("account.confirmation.loading")}</p>
      <Spinner />
    </div>
  );
}
