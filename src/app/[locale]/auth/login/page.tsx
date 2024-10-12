import LoginForm from "./_components/LoginForm";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return <LoginForm />;
}
