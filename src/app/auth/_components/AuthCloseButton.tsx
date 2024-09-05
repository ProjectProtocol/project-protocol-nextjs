"use client";

import { useOriginalPath } from "@/components/OriginalPathProvider";
import Link from "next/link";

export default function AuthCloseButton() {
  const { getOriginalPath } = useOriginalPath();

  return (
    <Link href={getOriginalPath()}>
      <i className="bi bi-x-lg h3" />
    </Link>
  );
}
