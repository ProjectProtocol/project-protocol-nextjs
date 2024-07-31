"use client";

import Paginator from "@/components/Paginator";
import Comment from "@/types/Comment";
import { Page } from "@/types/Search";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { listComments } from "@/lib/actions/resource";
import ResourceComment from "./ResourceComment";

export default function ResourceCommentsList({
  resourceId,
  initialData,
}: {
  resourceId: number;
  initialData: Page<Comment>;
}) {
  return (
    <div className="vertical-rhythm">
      <LazyMotion features={domAnimation}>
        {initialData && (
          <Paginator<Comment>
            data={initialData.data}
            meta={initialData.meta}
            getData={async (page) => await listComments(resourceId, page)}
            keyGenerator={(item, page) =>
              `comment-${resourceId}-${page}-${item.createdAt}`
            }
            ItemComponent={({ item, index }) => (
              <m.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: index * 0.05, ease: "easeOut" }}
              >
                <ResourceComment comment={item} />
              </m.div>
            )}
          />
        )}
      </LazyMotion>
    </div>
  );
}
