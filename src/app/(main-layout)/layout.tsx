import AuthProvider from "@/components/AuthProvider";
import Document from "@/components/Document";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu/Menu";
import MobileTabs from "@/components/Menu/MobileTabs";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Container } from "react-bootstrap";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <Document locale={locale}>
      <NextIntlClientProvider messages={messages}>
        <AuthProvider>
          <main className="d-flex flex-column min-vh-100">
            <Menu locale={locale} />
            <Container className="px-3 flex-grow-1" style={{ maxWidth: 630 }}>
              {children}
            </Container>
            <Footer />
            <MobileTabs />
          </main>
        </AuthProvider>
      </NextIntlClientProvider>
    </Document>
  );
}
