import { Container } from "react-bootstrap";
import Menu from "./ui/Menu";
import LandingPage from "./ui/LandingPage";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Resource from "./lib/types/Resource";
import { SearchData } from "./lib/types/SearchData";

async function getData() {
  const res = await fetch("http://localhost:3000/resources");
  let json: SearchData<Resource> = await res.json();

  return json.data.slice(0, 3) as Resource[];
}

export default async function Page() {
  const resources = await getData();
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      <Menu />
      <Container className="p-3" style={{ maxWidth: 935 }}>
        <LandingPage resources={resources} />
      </Container>
    </main>
  );
}
