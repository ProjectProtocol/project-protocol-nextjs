import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import NavItem from "react-bootstrap/NavItem";
import icon from "../../public/images/icon.svg";
import User from "../lib/types/User";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";
import Link from "next/link";

const MENU_MAX_WIDTH = 935;

interface IMenu {
  user?: User;
}

export default function Menu({ user }: IMenu) {
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
            <LocaleSwitcher />
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
              Home
            </NavLink>
            <NavLink as={Link} className=" m-0" href="/rate-my-po">
              Rate My PO
            </NavLink>
            <NavLink as={Link} className="  m-0" href="/resources">
              Resources
            </NavLink>
            {user ? (
              <NavLink
                as={Link}
                className="m-0"
                href="/account"
                title="Account"
              >
                <div className="d-flex justify-content-center align-items-center">
                  Profile
                  <i
                    className="bi bi-person-circle align-middle fs"
                    style={{ fontSize: "1.4rem" }}
                  />
                </div>
              </NavLink>
            ) : (
              <NavItem>
                <Link className="btn btn-primary" href="?login=true">
                  Sign Up
                </Link>
              </NavItem>
            )}
          </Nav>
          <Nav className="d-md-none">
            <LocaleSwitcher dark />
          </Nav>
        </Container>
      </div>
    </Navbar>
  );
}
