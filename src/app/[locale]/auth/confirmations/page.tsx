import ConfirmEmail from "./_components/ConfirmEmail";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ConfirmEmail />;
}
