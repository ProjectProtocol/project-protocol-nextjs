import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import MenuLink from "./MenuLink";
import LocaleLinks from "../LocaleLinks";
import User from "@/types/User";

export const MENU_MAX_WIDTH = 1048;

export default async function Menu({
  locale,
  user,
}: {
  locale: string;
  user?: User;
}) {
  const t = await getTranslations();

  return (
    <Navbar className="bg-black flex-column py-0 overflow-hidden" sticky="top">
      {/* Desktop locale switcher */}
      <div className="w-100 d-none d-md-block bg-black">
        <Container style={{ maxWidth: MENU_MAX_WIDTH }}>
          <div className="d-flex flex-row justify-content-end align-items-center py-2">
            <LocaleLinks locale={locale} dark />
          </div>
        </Container>
      </div>

      <div className="w-100 d-block bg-black bg-md-white">
        <Container
          style={{ maxWidth: MENU_MAX_WIDTH }}
          className="py-2 py-md-3 d-flex justify-content-between align-items-center"
        >
          <NavbarBrand as={Link} href="/">
            <div
              className="d-flex flex-row justify-content-center align-items-center"
              role="button"
            >
              <Image
                priority
                unoptimized
                src={"/images/icon.svg"}
                width="0"
                height="0"
                className="me-2"
                style={{ width: 28, height: 28 }}
                alt={"Project Protocol logo"}
              />
              <span className="fs-2 w-100 d-md-inline fw-semibold pe-auto text-white text-md-black">
                Project Protocol
              </span>
            </div>
          </NavbarBrand>
          <Nav className="fs-4 d-none d-md-flex align-items-center gap-2 fw-semibold">
            <MenuLink as={Link} className="m-0" href="/" exact>
              {t("home.title")}
            </MenuLink>
            <MenuLink href="/rate-my-po">{t("navigation.rateMyPo")}</MenuLink>
            <MenuLink className="m-0" href="/resources">
              {t("navigation.resources")}
            </MenuLink>
            {user ? (
              <MenuLink className="m-0" href="/account" title="Account">
                <div className="d-flex justify-content-center align-items-center">
                  <i
                    className="bi bi-person-circle align-middle fs"
                    title="Profile"
                    style={{ fontSize: "1.4rem" }}
                  />
                </div>
              </MenuLink>
            ) : (
              <NavItem>
                <Link
                  className="btn btn-primary"
                  href="/auth/signup"
                  scroll={false}
                >
                  {t("navigation.signUp")}
                </Link>
              </NavItem>
            )}
          </Nav>
          <Nav className="d-md-none">
            <LocaleLinks locale={locale} dark />
          </Nav>
        </Container>
      </div>
    </Navbar>
  );
}
