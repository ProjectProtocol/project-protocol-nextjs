"use client";

import { SearchMeta } from "@/types/Search";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { InView } from "react-intersection-observer";
import { uniqueId } from "lodash";

const paginatorAnimations = {};

interface IPaginator<T> {
  data: T[];
  meta: SearchMeta;
  getData: (page: number) => Promise<{ data: T[]; meta: SearchMeta }>;
  keyGenerator: (item: T, page: number) => string;
  ItemComponent: React.FC<{ item: T; page: number; index: number }>;
  ListEndComponent?: React.FC<{ index: number }>;
}

export default function Paginator<T>({
  data,
  meta,
  getData,
  keyGenerator,
  ItemComponent,
  ListEndComponent,
}: IPaginator<T>) {
  const [page, setPage] = useState(meta.page);
  const [totalPages, setTotalPages] = useState(meta.totalPages);
  const [itemPages, setItemPages] = useState<T[][]>([data] || []);
  const [pageLoading, setPageLoading] = useState(false);
  const [renderkey, setRenderKey] = useState(uniqueId());

  useEffect(() => {
    setItemPages([data]);
    setPage(meta.page);
    setTotalPages(meta.totalPages);
    setRenderKey(uniqueId());
  }, [data, meta]);

  const hasNextPage = useMemo(() => {
    return page < totalPages - 1;
  }, [page, totalPages]);

  const getMore = useCallback(async () => {
    if (!hasNextPage || pageLoading) return;

    setPageLoading(true);
    const newData = await getData(page + 1);
    setItemPages([...itemPages, ...[newData.data]]);
    setPage(newData.meta.page);
    setTotalPages(newData.meta.totalPages);
    setPageLoading(false);
  }, [page, pageLoading, itemPages, getData, hasNextPage]);

  return (
    <>
      {itemPages.map((items, pageIdx) =>
        items.map((i: T, idx: number) => (
          <>
            <ItemComponent
              item={i}
              page={pageIdx}
              index={idx}
              key={`${keyGenerator(i, pageIdx)}-${pageIdx}-${renderkey}`}
            />
            {ListEndComponent &&
              !hasNextPage &&
              pageIdx === totalPages - 1 &&
              idx === items.length - 1 && <ListEndComponent index={idx + 1} />}
          </>
        ))
      )}
      {/* When user scrolls to the end of the list, InView triggers getMore() */}
      <InView
        as="div"
        className="text-center"
        data-testid="observer-target"
        onChange={(inView) => inView && getMore()}
      >
        {pageLoading && <Spinner animation="border" />}
      </InView>
    </>
  );
}
