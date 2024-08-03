"use client";

import ConfirmEmail from "@/components/login/ConfirmEmail";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  return <ConfirmEmail email={email} />;
}
