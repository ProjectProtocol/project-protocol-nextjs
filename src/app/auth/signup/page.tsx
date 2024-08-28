import SignupForm from "@/app/auth/signup/_components/SignupForm";
import { getUser } from "@/lib/session";
import { useOriginalPath } from "@/components/OriginalPathProvider";

export default async function Page() {
  const { navigateToOriginalPath } = useOriginalPath();
  const user = await getUser();
  if (user) {
    navigateToOriginalPath(false);
  }

  return <SignupForm />;
}
