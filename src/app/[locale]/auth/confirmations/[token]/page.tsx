import { setRequestLocale } from "next-intl/server";
import ConfirmationSpinner from "./_components/ConfirmationSpinner";

export default function Page({
  params,
}: {
  params: { token: string; locale: string };
}) {
  setRequestLocale(params.locale);

  return <ConfirmationSpinner token={params.token} />;
}
