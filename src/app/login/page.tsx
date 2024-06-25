import LoginForm from "@/components/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  return <LoginForm />;
}
