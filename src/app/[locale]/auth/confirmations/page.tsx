import ConfirmEmail from "./_components/ConfirmEmail";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ConfirmEmail />;
}
