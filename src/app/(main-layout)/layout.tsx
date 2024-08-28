import Footer from "@/components/Footer";
import Menu from "@/components/Menu/Menu";
import MobileTabs from "@/components/Menu/MobileTabs";
import { Container } from "react-bootstrap";
import { useOriginalPath } from "@/components/OriginalPathProvider";
import { useEffect } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clearOriginalPath } = useOriginalPath();
  useEffect(() => {
    clearOriginalPath();
  });

  return (
    <main className="d-flex flex-column min-vh-100">
      <Menu />
      <Container className="p-3 flex-grow-1" style={{ maxWidth: 935 }}>
        {children}
      </Container>
      <Footer />
      <MobileTabs />
    </main>
  );
}
