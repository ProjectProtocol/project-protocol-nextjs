"use client";

import ConfirmEmail from "@/components/login/ConfirmEmail";
import { useSearchParams } from "next/navigation";

export default async function Page() {
  const email = useSearchParams().get("email") || "";
  const callbackURL = useSearchParams().get("callbackURL") || "";
  return <ConfirmEmail email={email} callbackURL={callbackURL} />;
}
