import { setRequestLocale } from "next-intl/server";
import LoginForm from "./_components/LoginForm";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return <LoginForm />;
}
