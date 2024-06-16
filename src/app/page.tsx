import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  return (
    <main>
      <h1>New landing page</h1>
      <a href="/resources">Resources</a>
    </main>
  );
}
