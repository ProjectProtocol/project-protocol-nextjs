import { setRequestLocale } from "next-intl/server";
import ConfirmationSpinner from "./_components/ConfirmationSpinner";

export default async function Page(
  props: {
    params: Promise<{ token: string; locale: string }>;
  }
) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return <ConfirmationSpinner token={params.token} />;
}
