"use client";

import { RateMyPoData } from "../_types";
import SearchResult from "@/components/search/SearchResult";
import Paginator from "@/components/Paginator";
import Agent from "@/types/Agent";
import Office from "@/types/Office";
import { LazyMotion, domAnimation, m } from "framer-motion";
import AddAgentCard from "./AddAgentCard";

type ResultsListProps = {
  initialData: RateMyPoData;
  searchText?: string;
  getMore: (page: number) => Promise<RateMyPoData>;
};

export default function ResultsList({
  initialData,
  getMore,
  searchText,
}: ResultsListProps) {
  return (
    <LazyMotion features={domAnimation}>
      <Paginator<Agent | Office>
        data={initialData.data}
        meta={initialData.meta}
        getData={getMore}
        keyGenerator={(item) =>
          `search-result-${searchText}-${item.type}-${item.id}`
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
