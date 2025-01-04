"use client";
import classNames from "classnames";
import { usePathname } from "@/i18n/routing";
import type { JSX } from "react";

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
    <div className="w-100">
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
    </div>
  );
}
