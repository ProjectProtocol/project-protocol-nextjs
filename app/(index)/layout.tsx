import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import Menu from "@/src/components/Menu";
import { Container } from "react-bootstrap";
import User from "@/src/lib/types/User";
import { reauthenticate } from "../actions/auth";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Protocol",
  description: "Resources and reviews for folx on parole",
};

async function getUser(): Promise<User> {
  const { user } = await reauthenticate();

  return user;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      <Menu user={user} />
      <Container className="p-3" style={{ maxWidth: 935 }}>
        {children}
      </Container>
    </main>
  );
}
