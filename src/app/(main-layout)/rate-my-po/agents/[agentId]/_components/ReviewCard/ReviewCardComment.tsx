"use client";

import { useTranslations } from "next-intl";
import Comment from "@/types/Comment";
import ModerationModal from "@/components/ModerationModal";
import { useState } from "react";

interface IReviewCardComment {
  comment: Comment;
}

export default function ReviewCardComment({ comment }: IReviewCardComment) {
  const t = useTranslations();
  const { body, status } = comment;
  const isPublished = status === "published";
  const [showModerationModal, setShowModerationModal] = useState(false);

  return (
    <>
      <div>
        <h4>{t("rate_agent.additionalComments")}</h4>
        {!isPublished && (
          <div
            className="bg-meyer-lemon bg-opacity-75 mb-3 rounded"
            style={{ padding: "12px" }}
          >
            <span>{t("rate_agent.unpublishedCommentHeader")}</span>{" "}
            <a
              className="link"
              role="button"
              onClick={() => setShowModerationModal(true)}
            >
              {t("rate_agent.unpublishedCommentHeaderLink")}
            </a>
          </div>
        )}
        <p>{body}</p>
      </div>
      <ModerationModal
        show={showModerationModal}
        closeButton={true}
        onHide={() => setShowModerationModal(false)}
      />
    </>
  );
}
