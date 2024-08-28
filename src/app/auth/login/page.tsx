import { useOriginalPath } from "@/components/OriginalPathProvider";
import LoginForm from "./_components/LoginForm";
import { getUser } from "@/lib/session";

export default async function Page() {
  const { navigateToOriginalPath } = useOriginalPath();
  const user = await getUser();
  if (user) {
    navigateToOriginalPath(false);
  }

  return <LoginForm />;
}
