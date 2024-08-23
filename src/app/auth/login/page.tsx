import LoginForm from "./_components/LoginForm";
import { headers } from "next/headers";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const referrer = headers().get("referer");
  const path = new URL(referrer || "").pathname;

  const user = await getUser();
  if (user) {
    redirect("/");
  }

  return <LoginForm callbackURL={path} />;
}
