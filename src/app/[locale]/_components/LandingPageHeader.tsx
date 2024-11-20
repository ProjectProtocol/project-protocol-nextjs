"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { InView } from "react-intersection-observer";
import { useState } from "react";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useTranslations } from "next-intl";

export default function LandingPageHeader({ locale }: { locale: string }) {
  const [bg, setBg] = useState("transparent");
  const t = useTranslations();
  return (
    <>
      <InView
        as="div"
        data-testid="observer-target"
        onChange={(inView) => setBg(inView ? "transparent" : "black")}
      />
      <Navbar
        fixed="top"
        bg={bg}
        style={{
          transition: "background-color 0.5s ease",
        }}
      >
        <Container fluid>
          <NavbarBrand
            as={Link}
            href="/"
            className="d-flex flex-row align-items-center"
          >
            <div className="d-md-none">
              <Image
                priority
                src="/images/icon.svg"
                width="20"
                height="20"
                className="me-2"
                alt={"Project Protocol logo"}
              />
            </div>
            <div className="d-none d-md-block me-2">
              <Image
                priority
                unoptimized
                src="/images/icon.svg"
                width="0"
                height="0"
                style={{ width: "25px", height: "auto" }}
                alt={"Project Protocol logo"}
              />
            </div>
          </NavbarBrand>
          <div className="d-flex flex-row align-items-center gap-1">
            <LocaleSwitcher locale={locale} dark />
            <a
              href="https://youngwomenfree.app.neoncrm.com/forms/project-protocol"
              target="_blank"
              className="btn btn-primary btn-sm"
            >
              {t("navigation.donate")}
            </a>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
