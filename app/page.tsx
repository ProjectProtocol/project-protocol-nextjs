import { Container } from "react-bootstrap";
import Menu from "./ui/Menu";

export default function Home() {
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      <Menu />
      <Container className="p-3" style={{ maxWidth: 935 }}>
        <h1 className="text-center">Project protocol</h1>
      </Container>
    </main>
  );
}
