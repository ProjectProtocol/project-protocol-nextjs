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
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "navigation" });
  return defaultMetadata({ title: t("theTeam.team") });
}

export default async function TheTeam({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("navigation");

  return (
    <ContentPage title={t("theTeam.team")} coverImageSrc={"team-cover_t33lhk"}>
      <TeamMemberList locale={locale} />
    </ContentPage>
  );
}
