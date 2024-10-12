import LoginForm from "./_components/LoginForm";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }

  return <LoginForm />;
}
