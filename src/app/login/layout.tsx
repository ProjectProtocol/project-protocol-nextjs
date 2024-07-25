import LocaleSwitcher from "@/components/LocaleSwitcher";
import Image from "next/image";
import { Container } from "react-bootstrap";
import icon from "../../../public/images/icon.svg";
import { getLocale, getTranslations } from "next-intl/server";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const user = await getUser();
  if (user) {
    redirect("/");
  }

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
              src={icon}
              width="40"
              height="0"
              className="me-2 h-auto"
              alt={"Project Protocol logo"}
            />
            <h2 className="mb-0">{t("login.loginTitle")}</h2>
          </div>
          {children}
        </div>
      </Container>
    </main>
  );
}
