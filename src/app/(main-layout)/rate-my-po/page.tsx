import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  return (
    <div>
      <h1>{t("rate_my_po.title")}</h1>
      <p>Resources content</p>
    </div>
  );
}
