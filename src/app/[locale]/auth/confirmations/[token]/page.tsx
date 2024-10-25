import { unstable_setRequestLocale } from "next-intl/server";
import ConfirmationSpinner from "./_components/ConfirmationSpinner";

export default function Page({
  params,
}: {
  params: { token: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);

  return <ConfirmationSpinner token={params.token} />;
}
