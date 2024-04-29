"use client";

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import icon from "../../public/images/icon.svg";
import User from "../lib/types/User";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import PageHeader from "./PageHeader";

const MENU_MAX_WIDTH = 935;

interface IMenu {
  user?: User;
}

export default function Menu({ user }: IMenu) {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user) setShowLogin(false);
  }, [user]);

  return (
    <>
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
            <Navbar.Brand as={Link} href="/">
              <div
                className="d-flex flex-row justify-content-center align-items-center"
                role="button"
              >
                <Image
                  src={icon.src}
                  width="28"
                  height="28"
                  className="me-2"
                  alt={"Project Protocol logo"}
                />
                <span
                  className="fs-2 w-100 d-md-inline fw-medium pe-auto text-white"
                  style={{ letterSpacing: -0.5 }}
                >
                  Project Protocol
                </span>
              </div>
            </Navbar.Brand>
            <Nav className="fs-4 d-none d-md-flex align-items-center text-white gap-2">
              <Nav.Link as={Link} className=" m-0" href="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} className=" m-0" href="/rate-my-po">
                Rate My PO
              </Nav.Link>
              <Nav.Link as={Link} className="  m-0" href="resources">
                Resources
              </Nav.Link>
              {user ? (
                <Nav.Link
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
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <Button onClick={() => setShowLogin(true)}>Sign Up</Button>
                </Nav.Link>
              )}
            </Nav>
            <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
            <Nav className="d-md-none">
              <LocaleSwitcher dark />
            </Nav>
          </Container>
        </div>
      </Navbar>
    </>
  );
}
