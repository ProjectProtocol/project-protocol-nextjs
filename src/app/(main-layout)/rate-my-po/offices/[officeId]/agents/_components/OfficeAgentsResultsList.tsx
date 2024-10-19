"use client";

import Paginator from "@/components/Paginator";
import Agent from "@/types/Agent";
import { useTranslations } from "next-intl";
import { SearchData } from "@/types/Search";
import SearchResultAgentSimple from "./SearchResultAgentSimple";

type OfficeAgentsResultsListProps = {
  initialData: SearchData<Agent>;
  searchText?: string;
  getMore: (page: number) => Promise<SearchData<Agent>>;
};

export default function OfficeAgentsResultsList({
  initialData,
  getMore,
  searchText = "",
}: OfficeAgentsResultsListProps) {
  const t = useTranslations();

  return (
    <>
      <Paginator<Agent>
        animated
        data={initialData.data}
        meta={initialData.meta}
        getData={getMore}
        keyGenerator={(item) =>
          `search-result-${String(searchText)}-${item.type}-${item.id}`
        }
        ItemComponent={({ item }) => <SearchResultAgentSimple agent={item} />}
      />
      {initialData.meta.total === 0 && t("shared.noResults")}
    </>
  );
}
