import { searchResources } from "@/lib/actions/resource";
import ResourceSearchResults from "./ResourcesSearchResults";
import SearchResultsInfo from "@/components/search/SearchResultsInfo";

async function getResources(page = 0, search = "") {
  const response = await fetch(
    `/api/resources?page=${String(page)}&search=${search}`
  );
  const data = await response.json();
  return data;
}

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
