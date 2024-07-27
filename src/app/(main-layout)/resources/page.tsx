import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import ResourcesList from "./_components/ResourcesList";
import { searchResources } from "@/lib/actions/resource";
import { Suspense } from "react";
import ResourceSearchBar from "./_components/ResourceSearchBar";
import SearchResultsInfo from "@/components/search/SearchResultsInfo";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const t = await getTranslations();

  return (
    <div className="vertical-rhythm">
      <PageHeader title={t("resources.title")} />
      <ResourceSearchBar />
      <Suspense>
        <ResourcesList searchText={searchParams.search} />
      </Suspense>
    </div>
  );
}
