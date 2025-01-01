import SignupForm from "@/app/[locale]/auth/signup/_components/SignupForm";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return <SignupForm />;
}
