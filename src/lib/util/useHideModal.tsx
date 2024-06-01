"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useHideModal(modalKey: string) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function hideModal() {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete(modalKey);
    router.replace(`${pathname}?${nextSearchParams}`);
  }

  return hideModal;
}
