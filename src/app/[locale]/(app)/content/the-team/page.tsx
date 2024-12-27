import ContentPage from "../_components/ContentPage";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ALL_LOCALES } from "@/i18n/config";
import { defaultMetadata } from "@/lib/metadataUtils";
import TeamMemberList from "../_components/TeamMemberList";

const locales = ALL_LOCALES;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "navigation" });
  return defaultMetadata({ title: t("theTeam") });
}

export default async function TheTeam({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("navigation");
  return (
    <ContentPage title={t("theTeam")} coverImageSrc={"team-cover_t33lhk"}>
      <TeamMemberList locale={params.locale} />
    </ContentPage>
  );
}
