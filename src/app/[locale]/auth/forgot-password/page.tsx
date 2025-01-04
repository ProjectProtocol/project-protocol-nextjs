import { setRequestLocale } from "next-intl/server";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return <ForgotPasswordForm />;
}
