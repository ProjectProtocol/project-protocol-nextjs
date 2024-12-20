"use client";

import { Link } from "@/i18n/routing";
import { Card, CardProps } from "react-bootstrap";

export interface IListItem extends CardProps {
  href?: string;
  children: React.ReactNode;
  cardClasses?: string;
}

export default function ListItem({
  children,
  href,
  cardClasses,
  ...cardProps
}: IListItem) {
  return (
    <Card
      as={href ? Link : undefined}
      href={href}
      className="pe-auto border-0 shadow-sm shadow-hover bg-white shadow-none-active bg-dark-subtle-active"
      style={{ transition: "box-shadow 0.5s" }}
      {...cardProps}
    >
      {children}
    </Card>
  );
}
