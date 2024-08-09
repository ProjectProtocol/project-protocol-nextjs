import ConfirmEmail from "@/components/login/ConfirmEmail";
import { getUser } from "@/lib/session";

export default async function Page() {
  const user = await getUser();
  const email = user?.email;
  if (!email) {
    return null;
  }
  return <ConfirmEmail email={email} />;
}
