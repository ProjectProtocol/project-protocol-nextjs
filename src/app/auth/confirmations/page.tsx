import ConfirmEmail from "@/app/auth/confirmations/_components/ConfirmEmail";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  const email = user?.email;

  if (!email) {
    return redirect("/");
  }

  return <ConfirmEmail email={email} />;
}
