import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import Menu from "@/src/components/Menu";
import { Container } from "react-bootstrap";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Protocol",
  description: "Resources and reviews for folx on parole",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      <Menu />
      <Container className="p-3" style={{ maxWidth: 935 }}>
        {children}
      </Container>
    </main>
  );
}
