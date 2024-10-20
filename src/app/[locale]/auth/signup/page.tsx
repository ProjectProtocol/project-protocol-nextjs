import SignupForm from "@/app/[locale]/auth/signup/_components/SignupForm";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <SignupForm />;
}
