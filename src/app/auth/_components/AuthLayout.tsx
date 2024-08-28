"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useOriginalPath } from "@/components/OriginalPathProvider";
import { headers } from "next/headers";

export default async function AuthLayout({
  locale,
  pageTitle,
  children,
}: {
  locale: string;
  pageTitle: string;
  children: React.ReactNode;
}) {
  const referrer = headers().get("referer");
  const host = process.env.HOST || "http://localhost:3001";
  let path;
  if (referrer && referrer.includes(host)) {
    path = new URL(referrer).pathname;
  }

  const { setOriginalPath } = useOriginalPath();
  setOriginalPath(["/auth", path]);

  return (
    <main className="vh-100 d-flex p-3 p-md-0 align-items-md-center">
      <Container fluid>
        <div
          className="m-auto vertical-rhythm"
          style={{ maxWidth: 336, minHeight: 700 }}
        >
          <div className="text-end mb-5">
            <a href="/">
              <i className="bi bi-x-lg h3" />
            </a>
          </div>
          <div className="text-center">
            <LocaleSwitcher locale={locale} />
          </div>
          <div className="text-center vertical-rhythm">
            <Image
              priority
              src="/images/icon.svg"
              width="40"
              height="0"
              className="me-2 h-auto"
              alt={"Project Protocol logo"}
            />
            <h2 className="mb-0">{pageTitle}</h2>
          </div>
          {children}
        </div>
      </Container>
    </main>
  );
}
