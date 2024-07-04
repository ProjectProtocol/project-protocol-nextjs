import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import RateMyPoSearchbar from "./_components/RateMyPoSearchBar";
import { search } from "@/lib/actions/search";
import { RateMyPoData } from "./_types";
import RateMyPoSearchResults from "./_components/RateMyPoSearchResults";
import { Suspense } from "react";
import LoadingPlaceholder from "./_components/LoadingPlaceholder";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const t = await getTranslations();

  const searchResults: RateMyPoData = await search({
    searchText: searchParams?.search,
  });

  return (
    <div className="vertical-rhythm">
      <PageHeader title={t("rate_my_po.title")} />
      <RateMyPoSearchbar />
      <p className="soft">
        {searchParams?.search
          ? t("rate_my_po.resultsDisplayed", {
              total: searchResults.meta.total,
            })
          : t("rate_my_po.mostRecent")}
      </p>
      <Suspense fallback={<LoadingPlaceholder />}>
        <RateMyPoSearchResults searchText={searchParams?.search} />
      </Suspense>
    </div>
  );
}
