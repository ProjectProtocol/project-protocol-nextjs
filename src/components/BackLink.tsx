"use client";

import { useRouter } from "next/navigation";

export default function BackLink() {
  const router = useRouter();

  return (
    <a role="button" onClick={() => router.back()}>
      <i className="bi bi-chevron-left align-middle" />
      Back
    </a>
  );
}
