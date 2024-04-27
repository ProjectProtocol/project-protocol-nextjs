import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

interface IPageHeader {
  title: string;
  showAccount?: boolean;
  showBack?: boolean;
  leftAction?: JSX.Element;
}

const SIGNED_IN = false;

export default function PageHeader({ title, showBack = false }: IPageHeader) {
  const router = useRouter();
  return (
    <div className="py-2">
      {/* MOBILE PAGE HEADER */}
      <Row className="d-md-none">
        <Col>
          {showBack && (
            <div className="d-flex flex-row h-100 justify-content-start align-items-center">
              <a role="button" onClick={() => router.back()}>
                <i className="bi bi-chevron-left align-middle" />
                Back
              </a>
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
            {SIGNED_IN ? (
              <Link href="/account" title="Account">
                <i className="bi bi-person-circle align-middle fs-3" />
              </Link>
            ) : (
              <a
                className="link-primary text-decoration-none"
                onClick={() => {}}
              >
                Sign Up
              </a>
            )}
          </div>
        </Col>
      </Row>

      {/* DESKTOP PAGE HEADER */}
      <div className="d-none d-md-block vertical-rhythm">
        {showBack && (
          <div>
            <a role="button" onClick={() => router.back()}>
              <i className="bi bi-chevron-left align-middle" />
              Back
            </a>
          </div>
        )}
        <h2 className="fw-semibold p-0 m-0">{title}</h2>
      </div>
    </div>
  );
}
