import ConfirmEmail from "./_components/ConfirmEmail";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return <ConfirmEmail />;
}
