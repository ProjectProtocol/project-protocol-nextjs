import { useTranslations } from "next-intl";
import Comment from "@/types/Comment";

interface IReviewCardComment {
  comment: Comment;
}

export default function ReviewCardComment({ comment }: IReviewCardComment) {
  const t = useTranslations();
  const { body, status } = comment;
  const isPublished = status === "published";

  return (
    <div>
      <h4>{t("rate_agent.additionalComments")}</h4>
      {!isPublished && (
        <div
          className="bg-meyer-lemon bg-opacity-75 mb-3 rounded"
          style={{ padding: "12px" }}
        >
          <span>{t("rate_agent.unpublishedCommentHeader")}</span>{" "}
          <a className="link" role="button">
            {t("rate_agent.unpublishedCommentHeaderLink")}
          </a>
        </div>
      )}
      <p>{body}</p>
    </div>
  );
}
