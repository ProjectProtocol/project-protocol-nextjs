import { searchResources } from "@/lib/actions/resource";
import ResourceSearchResults from "./ResourcesSearchResults";
import SearchResultsInfo from "@/components/search/SearchResultsInfo";

export default async function ResourcesList({
  searchText,
}: {
  searchText?: string;
}) {
  const initialData = await searchResources({
    search: searchText,
  });

  return (
    <>
      <SearchResultsInfo meta={initialData.meta} />
      <ResourceSearchResults initialData={initialData} />
    </>
  );
}
