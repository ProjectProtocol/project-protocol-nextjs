"use client";

import Resource from "@/types/Resource";
import Comment from "@/types/Comment";
import AnimatedList from "@/components/AnimatedList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { listComments } from "@/lib/actions/resource";
import { useTranslations } from "next-intl";
import ResourceComment from "./ResourceComment";
import { Page } from "@/types/Search";
import { Suspense } from "react";

export default function ResourceComments({ resource }: { resource: Resource }) {
  const t = useTranslations();
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const { ref, inView } = useInView();

  const loadComments = async () => {
    const { meta, data }: Page<Comment> = await listComments(resource.id, {
      page: page,
    });
    setComments([...comments, ...data]);
    if (meta.page < meta.totalPages - 1) {
      setPage(meta.page + 1);
    } else {
      setPage(undefined);
    }
  };

  useEffect(() => {
    if (inView) {
      loadComments();
    }
  }, [inView]);

  return (
    <Suspense>
      <AnimatedList>
        {comments.map((comment: Comment, index: number) => (
          <ResourceComment
            comment={comment}
            key={`comments-page-${resource.id}-${page}-${index}`}
          />
        ))}
        <div ref={ref}></div>
      </AnimatedList>
    </Suspense>
  );
}
