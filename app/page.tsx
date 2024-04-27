import { Container } from "react-bootstrap";
import Menu from "./ui/Menu";
import LandingPage from "./ui/LandingPage";

export default function Home() {
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      <Menu />
      <Container className="p-3" style={{ maxWidth: 935 }}>
        <LandingPage />
      </Container>
    </main>
  );
}
