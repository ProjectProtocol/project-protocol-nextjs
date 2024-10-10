import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import RateMyPoSearchbar from "./_components/RateMyPoSearchBar";
import RateMyPoSearchResults from "./_components/RateMyPoSearchResults";
import { Suspense } from "react";
import { metaTitle } from "@/lib/metadataUtils";

export async function generateMetadata() {
  const t = await getTranslations("home");
  return {
    title: metaTitle("Rate My PO"), // Create a method for building this
    description: t("rateMyPoDescription"), // Translate?
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
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
