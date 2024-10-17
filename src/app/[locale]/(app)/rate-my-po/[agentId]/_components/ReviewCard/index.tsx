import { Tag, tagsTranslationMap } from "@/types/Tag";
import { Review, Rating } from "@/types/Review";
import Card from "react-bootstrap/Card";
import TagBadge from "@/components/TagBadge";
import RatingBar from "../RatingBar";
import ReviewCardComment from "./ReviewCardComment";
import { useTranslations } from "next-intl";

interface IReviewCard {
  review: Review;
}

export default function ReviewCard({ review }: IReviewCard) {
  const { comment, id, ratings, tags } = review;
  const t = useTranslations();
  const uiKey = `review-${id}`;

  return (
    <Card body>
      <div className="vertical-rhythm-sm">
        <div>
          {ratings.map((r: Rating, i: number) => (
            <RatingBar rating={r} key={`${uiKey}-rating-${i}`} />
          ))}
        </div>
        <div>
          {tags.map((tag: Tag, i: number) => (
            <TagBadge
              label={t(tagsTranslationMap[tag.name])}
              className="me-2 mb-2 p-2"
              key={`${uiKey}-tag-${i}`}
            />
          ))}
        </div>
        {comment && <ReviewCardComment comment={comment} />}
      </div>
    </Card>
  );
}
