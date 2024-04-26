import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      <Container className="p-3" style={{ maxWidth: 935 }}>
        <h1 className="text-center">Project protocol</h1>
      </Container>
    </main>
  );
}
