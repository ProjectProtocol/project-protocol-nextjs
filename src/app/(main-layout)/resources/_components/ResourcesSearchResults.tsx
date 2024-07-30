"use client";

import Paginator from "@/components/Paginator";
import Resource, { ResourceSearchParams } from "@/types/Resource";
import { SearchData } from "@/types/Search";
import ResourceCard from "./ResourceCard";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { searchResources } from "@/lib/actions/resource";

export default function ResourceSearchResults({
  initialData,
  searchParams,
}: {
  initialData: SearchData<Resource>;
  searchParams: ResourceSearchParams;
}) {
  const searchText = searchParams?.search ?? "";

  return (
    <div className="vertical-rhythm">
      <LazyMotion features={domAnimation}>
        <Paginator<Resource>
          data={initialData.data}
          meta={initialData.meta}
          getData={async (page) =>
            await searchResources({ page: String(page), search: searchText })
          }
          keyGenerator={(item, page) =>
            `search-result-${searchText}-${item.type}-${page}-${item.id}`
          }
          ItemComponent={({ item, index }) => (
            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: index * 0.05, ease: "easeOut" }}
            >
              <ResourceCard resource={item} />
            </m.div>
          )}
        />
      </LazyMotion>
    </div>
  );
}
