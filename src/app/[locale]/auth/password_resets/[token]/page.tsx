import { setRequestLocale } from "next-intl/server";
import PasswordResetForm from "./_components/PasswordResetForm";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);

  return <PasswordResetForm token={token} />;
}
