"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";

export default function MobileTabItem({
  icon,
  label,
  to,
}: {
  icon: JSX.Element;
  label: string;
  to: string;
}) {
  const path = usePathname();
  const isActive = to === "/" ? path === "/" : path.startsWith(to);

  return (
    <a
      href={to}
      className={classNames(
        "d-flex flex-column align-items-center text-decoration-none",
        {
          "text-primary": isActive,
        }
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
