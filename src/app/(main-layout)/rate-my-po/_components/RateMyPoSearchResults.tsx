import { search } from "@/lib/actions/search";
import ResultsList from "./ResultsList";

type SearchResultsListProps = {
  searchText?: string;
};

export default async function SearchResultsList({
  searchText,
}: SearchResultsListProps) {
  const initialData = await search({ searchText });

  async function getMore(page: number) {
    "use server";
    return await search({
      searchText,
      page,
    });
  }

  return (
    <ResultsList
      initialData={initialData}
      getMore={getMore}
      searchText={searchText}
    />
  );
}
