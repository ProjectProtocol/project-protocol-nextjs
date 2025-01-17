import Menu from "@/components/Menu/Menu";
import MobileTabs from "@/components/Menu/MobileTabs";
import { defaultMetadata } from "@/lib/metadataUtils";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "react-bootstrap";

export const metadata: Metadata = defaultMetadata();

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main className="d-flex flex-column min-vh-100">
      <Menu />
      <Container className="px-3 flex-grow-1" style={{ maxWidth: 630 }}>
        {children}
      </Container>
      <MobileTabs />
    </main>
  );
}
