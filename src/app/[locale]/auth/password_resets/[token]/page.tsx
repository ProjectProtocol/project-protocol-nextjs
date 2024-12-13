import { setRequestLocale } from "next-intl/server";
import PasswordResetForm from "./_components/PasswordResetForm";

export default async function Page(
  props: {
    params: Promise<{ token: string; locale: string }>;
  }
) {
  const params = await props.params;
  setRequestLocale(params.locale);
  return <PasswordResetForm token={params.token} />;
}
