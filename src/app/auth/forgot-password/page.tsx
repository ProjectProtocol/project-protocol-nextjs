import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }

  return <ForgotPasswordForm />;
}
