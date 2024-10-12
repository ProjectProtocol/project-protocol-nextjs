"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import styles from "@/styles/landing-page.module.scss";
import { InView } from "react-intersection-observer";
import { useState } from "react";
import LocaleLinks from "./LocaleLinks";

export default function LandingPageHeader({ locale }: { locale: string }) {
  const [bg, setBg] = useState("transparent");
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
            <span
              className={
                "w-100 d-md-inline fw-medium pe-auto text-white " +
                styles.navbarTitle
              }
            >
              Project Protocol
            </span>
          </NavbarBrand>
          <LocaleLinks locale={locale} dark />
        </Container>
      </Navbar>
    </>
  );
}
