"use client";
import { ApiResources } from "@/src/api";
import Resource from "@/src/lib/types/Resource";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { Button } from "react-bootstrap";

interface IResourceVoteControls {
  resource: Resource;
}

export default function ResourceVoteControls({
  resource,
}: IResourceVoteControls) {
  const [resourceData, setResourceData] = useState<Resource>(resource);

  async function dislikeResource() {
    const data = await ApiResources.dislike(resource.id);
    setResourceData(data.resource);
  }

  async function likeResource() {
    const data = await ApiResources.like(resource.id);
    setResourceData(data.resource);
  }

  return (
    <div className="d-flex flex-row flex-wrap gap-2 align-items-center text-dark">
      <div className={"d-flex flex-row gap-1"}>
        <span data-testid="likes-count">{resource.votesUp}</span>
        <i
          data-testid="like-button"
          className={`bi me-1 align-middle bi-hand-thumbs-up${
            resource.isCurrentUserLiked ? "-fill" : ""
          }`}
          role="button"
          onClick={likeResource}
        />
      </div>
      <div className={"d-flex flex-row gap-1"}>
        <span data-testid="dislikes-count">{resource.votesDown}</span>
        <i
          data-testid="dislike-button"
          className={`bi me-1 align-middle bi-hand-thumbs-down${
            resource.isCurrentUserDisliked ? "-fill" : ""
          }`}
          role="button"
          onClick={dislikeResource}
        />
      </div>
    </div>
  );
}
