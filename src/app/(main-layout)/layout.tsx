import Menu from "@/components/Menu/Menu";
import MobileTabs from "@/components/Menu/MobileTabs";
import { Container } from "react-bootstrap";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Menu />
      <Container className="p-3">{children}</Container>
      <MobileTabs />
    </main>
  );
}
