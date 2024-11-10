import { setRequestLocale } from "next-intl/server";
import PasswordResetForm from "./_components/PasswordResetForm";

export default async function Page({
  params,
}: {
  params: { token: string; locale: string };
}) {
  setRequestLocale(params.locale);
  return <PasswordResetForm token={params.token} />;
}
