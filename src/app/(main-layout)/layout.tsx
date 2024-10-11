import Footer from "@/components/Footer";
import Menu from "@/components/Menu/Menu";
import MobileTabs from "@/components/Menu/MobileTabs";
import { Container } from "react-bootstrap";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="d-flex flex-column min-vh-100">
      <Menu />
      <Container className="px-3 flex-grow-1" style={{ maxWidth: 630 }}>
        {children}
      </Container>
      <Footer />
      <MobileTabs />
    </main>
  );
}
