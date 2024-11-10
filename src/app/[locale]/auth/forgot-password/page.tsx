import { setRequestLocale } from "next-intl/server";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ForgotPasswordForm />;
}
