import { setRequestLocale } from "next-intl/server";
import ConfirmationSpinner from "./_components/ConfirmationSpinner";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);

  return <ConfirmationSpinner token={token} />;
}
