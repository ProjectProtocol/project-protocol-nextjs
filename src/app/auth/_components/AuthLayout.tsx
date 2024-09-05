import Image from "next/image";
import { Container } from "react-bootstrap";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import AuthCloseButton from "./AuthCloseButton";

export default async function AuthLayout({
  locale,
  pageTitle,
  children,
}: {
  locale: string;
  pageTitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="vh-100 d-flex p-3 p-md-0 align-items-md-center">
      <Container fluid>
        <div
          className="m-auto vertical-rhythm"
          style={{ maxWidth: 336, minHeight: 700 }}
        >
          <div className="text-end mb-5">
            <AuthCloseButton />
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
