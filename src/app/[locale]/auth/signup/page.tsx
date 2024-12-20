import SignupForm from "@/app/[locale]/auth/signup/_components/SignupForm";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <SignupForm />;
}
