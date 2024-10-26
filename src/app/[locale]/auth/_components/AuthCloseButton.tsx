"use client";

import { useOriginalPath } from "@/components/OriginalPathProvider";
import { Link } from "@/i18n/routing";

export default function AuthCloseButton() {
  const { getOriginalPath } = useOriginalPath();

  return (
    <Link href={getOriginalPath()}>
      <i className="bi bi-x-lg h3" />
    </Link>
  );
}
