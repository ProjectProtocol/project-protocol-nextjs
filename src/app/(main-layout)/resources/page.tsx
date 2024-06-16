import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  return (
    <div>
      <h1>{t("resources.title")}</h1>
      <p>Resources content</p>
    </div>
  );
}
