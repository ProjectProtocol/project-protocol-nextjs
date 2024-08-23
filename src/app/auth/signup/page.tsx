import SignupForm from "@/app/auth/signup/_components/SignupForm";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }

  return <SignupForm />;
}
