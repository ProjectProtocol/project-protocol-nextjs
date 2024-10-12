import SignupForm from "./_components/SignupForm";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return <SignupForm />;
}
