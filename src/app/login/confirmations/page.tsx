import ConfirmEmail from "@/components/login/ConfirmEmail";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();
  const email = session?.user.email;
  if (!email) {
    return null;
  }
  return <ConfirmEmail email={email} />;
}
