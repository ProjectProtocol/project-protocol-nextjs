import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import RateMyPoSearchbar from "./_components/RateMyPoSearchBar";
import { search } from "@/lib/actions/search";
import { RateMyPoData } from "./_types";
import RateMyPoSearchResults from "./_components/RateMyPoSearchResults";

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

  async function getMore(page: number) {
    "use server";
    return await search({
      searchText: searchParams?.search,
      page,
    });
  }

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
      <RateMyPoSearchResults
        getMore={getMore}
        initialData={searchResults}
        searchText={searchParams?.search}
      />
    </div>
  );
}
