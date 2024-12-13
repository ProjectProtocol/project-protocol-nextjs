import { setRequestLocale } from "next-intl/server";
import LoginForm from "./_components/LoginForm";

export default async function Page(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  return <LoginForm />;
}
