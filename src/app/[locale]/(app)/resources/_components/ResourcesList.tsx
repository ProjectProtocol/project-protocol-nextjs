import { searchResources } from "@/lib/actions/resource";
import ResourceSearchResults from "./ResourcesSearchResults";
import SearchResultsInfo from "@/components/search/SearchResultsInfo";
import { ResourceSearchParams } from "@/types/Resource";

export default async function ResourcesList({
  searchParams,
}: {
  searchParams: ResourceSearchParams;
}) {
  const initialData = await searchResources(searchParams);

  return (
    <>
      <SearchResultsInfo meta={initialData.meta} />
      <ResourceSearchResults
        initialData={initialData}
        searchParams={searchParams}
      />
    </>
  );
}
