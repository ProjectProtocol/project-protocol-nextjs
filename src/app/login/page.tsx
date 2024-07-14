import LoginForm from "@/components/login/LoginForm";
import { headers } from "next/headers";

export default async function Page() {
  const referrer = headers().get("referer");
  const path = new URL(referrer || "").pathname;

  return <LoginForm callbackURL={path} />;
}
