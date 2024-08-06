"use client";

import ConfirmEmail from "@/components/login/ConfirmEmail";
import { useSearchParams } from "next/navigation";

export default async function Page() {
  const email = useSearchParams().get("email") || "";
  return <ConfirmEmail email={email} />;
}
