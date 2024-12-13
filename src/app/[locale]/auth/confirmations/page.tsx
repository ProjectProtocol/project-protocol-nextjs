import ConfirmEmail from "./_components/ConfirmEmail";
import { setRequestLocale } from "next-intl/server";

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
  return <ConfirmEmail />;
}
