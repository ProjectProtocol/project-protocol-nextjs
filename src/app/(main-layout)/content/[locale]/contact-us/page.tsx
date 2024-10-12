import ContentPage from "../_components/ContentPage";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ALL_LOCALES } from "@/i18n/config";
import { metaTitle } from "@/lib/metadataUtils";

const locales = ALL_LOCALES;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("home");
  return {
    title: metaTitle(t("contact.title")),
  };
}

export default async function ContactUs({
  params,
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("home");

  return (
    <ContentPage title={t("contact.title")}>
      <p className="mb-3">{t("contact.questions")}</p>
      <div className="mb-3">
        <span className="me-1">{t("contact.email")}</span>
        <a href="mailto:info@projectprotocol.org">info@projectprotocol.org</a>
      </div>
      <div className="mb-3">
        <span className="me-1">{t("contact.callOrText")}</span>
        <a href="tel:(213)915-8585">(213) 915-8585</a>
      </div>
    </ContentPage>
  );
}
