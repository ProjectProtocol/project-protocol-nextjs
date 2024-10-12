import AuthProvider from "@/components/AuthProvider";
import Menu from "@/components/Menu/Menu";
import MobileTabs from "@/components/Menu/MobileTabs";
import { getUser } from "@/lib/session";
import { unstable_setRequestLocale } from "next-intl/server";
import { Container } from "react-bootstrap";

export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const user = await getUser();

  return (
    <main className="d-flex flex-column min-vh-100">
      <Menu locale={locale} user={user} />
      <Container className="px-3 flex-grow-1" style={{ maxWidth: 630 }}>
        <AuthProvider>{children}</AuthProvider>
      </Container>
      <MobileTabs />
    </main>
  );
}
