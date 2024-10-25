"use client";

import Paginator from "@/components/Paginator";
import Resource, { ResourceSearchParams } from "@/types/Resource";
import { SearchData } from "@/types/Search";
import ResourceCard from "./ResourceCard";
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
      <Paginator<Resource>
        animated
        data={initialData.data}
        meta={initialData.meta}
        getData={async (page) =>
          await searchResources({ page: String(page), search: searchText })
        }
        keyGenerator={(item, page) =>
          `search-result-${searchText}-${item.type}-${page}-${item.id}`
        }
        ItemComponent={({ item }) => <ResourceCard resource={item} />}
      />
    </div>
  );
}
