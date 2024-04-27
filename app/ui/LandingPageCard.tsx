import Link from "next/link";
import { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface ILandingPageCard {
  icon: ReactNode;
  href: string;
  title: string;
  description: string;
  cardClass: string;
}

export default function LandingPageCard({
  cardClass,
  href,
  icon,
  title,
  description,
}: ILandingPageCard) {
  return (
    <Link href={href} className="text-decoration-none">
      <Card
        body
        className={`${cardClass} home-card-gradient h-100 shadow position-relative`}
      >
        <div className="d-flex flex-column h-100">
          <h4 className="w-100 d-flex justify-content-between align-items-center">
            {title}
            <i className="bi bi-chevron-right small opacity-75 align-middle"></i>
          </h4>
          <p className="m-0 pe-4">{description}</p>
          <div className="h-100 d-flex justify-content-end align-items-end">
            {icon}
          </div>
        </div>
      </Card>
    </Link>
  );
}
