import { unstable_setRequestLocale } from "next-intl/server";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default async function Page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);

  return <ForgotPasswordForm />;
}
