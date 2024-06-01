"use client";

import Resource from "@/src/lib/types/Resource";

interface IResourceVoteControls {
  resource: Resource;
  likeResource: () => void;
  dislikeResource: () => void;
}

export default function ResourceVoteControls({
  resource,
  likeResource,
  dislikeResource,
}: IResourceVoteControls) {
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
          onClick={async () => await likeResource()}
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
          onClick={async () => await dislikeResource()}
        />
      </div>
    </div>
  );
}
