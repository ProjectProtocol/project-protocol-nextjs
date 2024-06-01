import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import Menu from "@/src/components/Menu";
import Container from "react-bootstrap/Container";
import Footer from "@/src/components/Footer";
import MobileTabs from "@/src/components/MobileTabs";
import { auth as sessionAuth } from "../actions/auth";
import AuthProvider from "@/src/components/SessionProvider";
const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Protocol",
  description: "Resources and reviews for folx on parole",
};

export default async function Layout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session = await sessionAuth();

  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      <AuthProvider>
        {session ? null : auth}
        <Menu signedIn={!!session?.user} />
        <Container className="p-3" style={{ maxWidth: 935 }}>
          {children}
        </Container>
        <MobileTabs />
        <Footer />
      </AuthProvider>
    </main>
  );
}
