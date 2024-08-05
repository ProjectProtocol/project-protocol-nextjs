"use client";

import { SearchMeta } from "@/types/Search";
import { domAnimation, LazyMotion } from "framer-motion";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { InView } from "react-intersection-observer";
import AnimatedItem from "./AnimatedItem";

interface IPaginator<T> {
  data: T[];
  meta: SearchMeta;
  getData: (page: number) => Promise<{ data: T[]; meta: SearchMeta }>;
  keyGenerator: (item: T, page: number) => string;
  ItemComponent: React.FC<{ item: T; page: number; index: number }>;
  ListEndComponent?: React.FC;
  animated?: boolean;
}

export default function Paginator<T>({
  data,
  meta,
  getData,
  keyGenerator,
  ItemComponent,
  ListEndComponent,
  animated,
}: IPaginator<T>) {
  const [page, setPage] = useState(meta.page);
  const [totalPages, setTotalPages] = useState(meta.totalPages);
  const [itemPages, setItemPages] = useState<T[][]>(data ? [data] : []);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setItemPages([data]);
    setPage(meta.page);
    setTotalPages(meta.totalPages);
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
    <LazyMotion features={domAnimation}>
      {itemPages.map((items, pageIdx) => (
        <Fragment key={`item-page-${pageIdx}`}>
          {items.map((i: T, idx: number) => {
            const key = keyGenerator(i, pageIdx);

            return (
              <>
                <AnimatedItem animated={animated} index={idx} key={key}>
                  <ItemComponent item={i} page={pageIdx} index={idx} />
                </AnimatedItem>
              </>
            );
          })}
          {ListEndComponent && !hasNextPage && pageIdx === totalPages - 1 && (
            <AnimatedItem animated={animated} index={items.length}>
              <ListEndComponent />
            </AnimatedItem>
          )}
        </Fragment>
      ))}
      {/* When user scrolls to the end of the list, InView triggers getMore() */}
      <InView
        as="div"
        className="text-center"
        data-testid="observer-target"
        onChange={(inView) => inView && getMore()}
      >
        {pageLoading && <Spinner animation="border" />}
      </InView>
    </LazyMotion>
  );
}
