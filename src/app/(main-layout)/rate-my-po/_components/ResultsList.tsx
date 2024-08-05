"use client";

import { RateMyPoData } from "../_types";
import SearchResult from "@/components/search/SearchResult";
import Paginator from "@/components/Paginator";
import Agent from "@/types/Agent";
import Office from "@/types/Office";
import AddAgentCard from "./AddAgentCard";
import { useTranslations } from "next-intl";

type ResultsListProps = {
  initialData: RateMyPoData;
  searchText?: string;
  getMore: (page: number) => Promise<RateMyPoData>;
};

export default function ResultsList({
  initialData,
  getMore,
  searchText = "",
}: ResultsListProps) {
  const t = useTranslations();
  return (
    <>
      <p className="soft">
        {searchText
          ? t("rate_my_po.resultsDisplayed", {
              total: initialData.meta.total,
            })
          : t("rate_my_po.mostRecent")}
      </p>
      <Paginator<Agent | Office>
        animated
        data={initialData.data}
        meta={initialData.meta}
        getData={getMore}
        keyGenerator={(item) =>
          `search-result-${String(searchText)}-${item.type}-${item.id}`
        }
        ItemComponent={({ item }) => <SearchResult result={item} />}
        ListEndComponent={AddAgentCard}
      />
      {initialData.meta.total === 0 && <AddAgentCard />}
    </>
  );
}
