import Menu from "@/components/Menu";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  return (
    <main>
      <Menu />
      <h1>New landing page</h1>
      <a href="/resources">Resources</a>
    </main>
  );
}
