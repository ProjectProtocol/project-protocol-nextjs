"use client";

import Paginator from "@/components/Paginator";
import Comment from "@/types/Comment";
import { Page } from "@/types/Search";
import { listComments } from "@/lib/actions/resource";
import ResourceComment from "./ResourceComment";

export default function ResourceCommentsList({
  resourceId,
  initialData = { data: [], meta: { total: 0, totalPages: 0, page: 0 } },
}: {
  resourceId: number;
  initialData: Page<Comment>;
}) {
  return (
    <div className="vertical-rhythm">
      <Paginator<Comment>
        animated
        data={initialData.data}
        meta={initialData.meta}
        getData={async (page) => await listComments(resourceId, page)}
        keyGenerator={(item, page) =>
          `comment-${resourceId}-${page}-${item.createdAt}`
        }
        ItemComponent={({ item }) => <ResourceComment comment={item} />}
      />
    </div>
  );
}
