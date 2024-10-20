import { unstable_setRequestLocale } from "next-intl/server";
import LoginForm from "./_components/LoginForm";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <LoginForm />;
}
