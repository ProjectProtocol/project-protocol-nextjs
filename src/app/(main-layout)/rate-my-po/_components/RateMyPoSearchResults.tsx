"use client";

import { RateMyPoData } from "../_types";
import SearchResult from "@/components/search/SearchResult";
import Paginator from "@/components/Paginator";
import Agent from "@/types/Agent";
import Office from "@/types/Office";
import { uniqueId } from "lodash-es";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import AddAgentCard from "./AddAgentCard";

type SearchResultsListProps = {
  initialData: RateMyPoData;
  getMore: (page: number) => Promise<RateMyPoData>;
  searchText?: string;
};

export default function SearchResultsList({
  initialData,
  searchText,
  getMore,
}: SearchResultsListProps) {
  const [renderKey, setRenderKey] = useState(uniqueId());

  useEffect(() => {
    setRenderKey(uniqueId());
  }, [initialData]);

  return (
    <LazyMotion features={domAnimation}>
      <Paginator<Agent | Office>
        data={initialData.data}
        meta={initialData.meta}
        getData={getMore}
        keyGenerator={(item, page) =>
          `search-result-${searchText}-${item.type}-${item.id}-${renderKey}-${page}`
        }
        ItemComponent={({ item, index }) => (
          <m.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: index * 0.15, ease: "easeOut" }}
          >
            <SearchResult result={item} />
          </m.div>
        )}
        ListEndComponent={({ index }) => (
          <m.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: index * 0.15, ease: "easeOut" }}
          >
            <AddAgentCard />
          </m.div>
        )}
      />
      {initialData.meta.total === 0 && (
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ ease: "easeOut" }}
        >
          <AddAgentCard />
        </m.div>
      )}
    </LazyMotion>
  );
}
