import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import NavItem from "react-bootstrap/NavItem";
import icon from "../../../public/images/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import LocaleSwitcher from "../LocaleSwitcher";
import { getUser } from "@/lib/session";

export const MENU_MAX_WIDTH = 935;

export default async function Menu() {
  const t = await getTranslations();
  const user = await getUser();
  const locale = await getLocale();

  return (
    <Navbar
      variant="dark"
      className="bg-black flex-column py-0 overflow-hidden"
      sticky="top"
    >
      {/* Desktop locale switcher */}
      <div className="w-100 d-none d-md-block bg-white">
        <Container style={{ maxWidth: MENU_MAX_WIDTH }}>
          <div className="d-flex flex-row justify-content-end align-items-center py-2">
            <LocaleSwitcher locale={locale} />
          </div>
        </Container>
      </div>

      <div className="w-100 d-block bg-black">
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
                src={icon.src}
                width="28"
                height="0"
                className="me-2 h-auto"
                alt={"Project Protocol logo"}
              />
              <span
                className="fs-2 w-100 d-md-inline fw-medium pe-auto text-white"
                style={{ letterSpacing: -0.5 }}
              >
                Project Protocol
              </span>
            </div>
          </NavbarBrand>
          <Nav className="fs-4 d-none d-md-flex align-items-center text-white gap-2">
            <NavLink as={Link} className=" m-0" href="/">
              {t("home.title")}
            </NavLink>
            <NavLink as={Link} className=" m-0" href="rate-my-po">
              {t("navigation.rateMyPo")}
            </NavLink>
            <NavLink as={Link} className="  m-0" href="resources">
              {t("navigation.resources")}
            </NavLink>
            {user ? (
              <NavLink
                as={Link}
                className="m-0"
                href="/account"
                title="Account"
              >
                <div className="d-flex justify-content-center align-items-center">
                  <i
                    className="bi bi-person-circle align-middle fs"
                    title="Profile"
                    style={{ fontSize: "1.4rem" }}
                  />
                </div>
              </NavLink>
            ) : (
              <NavItem>
                <Link className="btn btn-primary" href="/login" scroll={false}>
                  {t("navigation.signUp")}
                </Link>
              </NavItem>
            )}
          </Nav>
          <Nav className="d-md-none">
            <LocaleSwitcher locale={locale} dark />
          </Nav>
        </Container>
      </div>
    </Navbar>
  );
}
