"use client";
import { Col, Row } from "react-bootstrap";
import BackLink from "./BackLink";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "./AuthProvider";

interface IPageHeader {
  title: string | JSX.Element;
  showAccount?: boolean;
  showBack?: boolean;
  leftAction?: JSX.Element;
  hideOnDesktop?: boolean;
}

export default function PageHeader({
  title,
  showBack = false,
  hideOnDesktop,
}: IPageHeader) {
  const { user } = useAuth();
  const t = useTranslations();

  return (
    <div className={`py-3 ${hideOnDesktop ? "d-md-none" : ""}`}>
      {/* MOBILE PAGE HEADER */}
      <Row className="d-md-none">
        <Col>
          {showBack && (
            <div className="d-flex flex-row h-100 justify-content-start align-items-center">
              <BackLink>
                <i className="bi bi-chevron-left align-middle" />
                {t("shared.back")}
              </BackLink>
            </div>
          )}
        </Col>
        <Col xs="auto" style={{ maxWidth: "60%" }}>
          <div className="d-flex flex-row h-100 justify-content-end align-items-center">
            <h2
              className="text-center fw-semibold p-0 m-0"
              style={{ fontSize: "min(5vw, 1.5rem)" }}
            >
              {title}
            </h2>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-row h-100 justify-content-end align-items-center">
            {user ? (
              <Link href="/account" title="Account">
                <i className="bi bi-person-circle align-middle fs-3" />
              </Link>
            ) : (
              <Link
                className="link-primary text-decoration-none"
                href="/auth/signup"
              >
                {t("navigation.signUp")}
              </Link>
            )}
          </div>
        </Col>
      </Row>

      {/* DESKTOP PAGE HEADER */}
      <div className="d-none d-md-block vertical-rhythm py-3">
        {showBack && (
          <div>
            <BackLink>
              <i className="bi bi-chevron-left align-middle" />
              {t("shared.back")}
            </BackLink>
          </div>
        )}
        <h2 className="fw-semibold p-0 m-0">{title}</h2>
      </div>
    </div>
  );
}
