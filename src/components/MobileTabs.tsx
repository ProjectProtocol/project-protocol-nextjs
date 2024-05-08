"use client";

import { Navbar } from "react-bootstrap";
import SearchIcon from "./svg/SearchIcon";
import ResourcesIcon from "./svg/ResourcesIcon";
import HomeIcon from "./svg/HomeIcon";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function MobileTabItem({
  icon,
  label,
  to,
  isActive,
}: {
  icon: JSX.Element;
  label: string;
  to: string;
  isActive?: boolean;
}) {
  return (
    <Link
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
    </Link>
  );
}

export default function MobileTabs() {
  const pathname = usePathname();

  return (
    <Navbar fixed="bottom" className="bg-white shadow shadow-lg d-md-none">
      <div className="d-flex justify-content-around align-items-center w-100 h-100 py-1">
        <MobileTabItem
          icon={<HomeIcon />}
          label="Home"
          to="/"
          isActive={pathname === "/" || pathname === ""}
        />
        <MobileTabItem
          icon={<SearchIcon />}
          label="Rate my PO"
          to="rate-my-po"
          isActive={pathname.startsWith("/rate-my-po")}
        />
        <MobileTabItem
          icon={<ResourcesIcon />}
          label="Resources"
          to="resources"
          isActive={pathname.startsWith("/resources")}
        />
      </div>
    </Navbar>
  );
}
