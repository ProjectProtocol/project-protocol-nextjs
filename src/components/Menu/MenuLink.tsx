"use client";

import { Link, usePathname } from "@/i18n/routing";
import { NavLink, NavLinkProps } from "react-bootstrap";

/**
 * Client component wrapper for react-bootstrap NavLink + Nextjs Link
 */
export default function MenuLink({
  href,
  children,
  exact,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
} & NavLinkProps) {
  const pathname = usePathname();
  return (
    <NavLink
      as={Link}
      href={href}
      active={exact ? pathname === href : pathname.startsWith(href)}
      {...rest}
    >
      {children}
    </NavLink>
  );
}
