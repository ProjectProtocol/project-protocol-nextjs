import PageHeader from "@/components/PageHeader";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import RateMyPoSearchbar from "./_components/RateMyPoSearchBar";
import RateMyPoSearchResults from "./_components/RateMyPoSearchResults";
import { Suspense } from "react";
import { metaTitle } from "@/lib/metadataUtils";
import { ALL_LOCALES } from "@/i18n/config";

export async function generateStaticParams() {
  return ALL_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: metaTitle("Rate My PO"), // Create a method for building this
    description: t("rateMyPoDescription"), // Translate?
  };
}

export default async function Page({
  searchParams,
  params: { locale },
}: {
  searchParams?: {
    search?: string;
  };
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader title={t("rate_my_po.title")} />
      <div className="vertical-rhythm">
        <RateMyPoSearchbar />
        <Suspense>
          <RateMyPoSearchResults searchText={searchParams?.search} />
        </Suspense>
      </div>
    </>
  );
}
