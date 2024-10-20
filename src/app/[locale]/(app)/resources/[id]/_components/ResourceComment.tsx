import Comment from "@/types/Comment";
import { Card } from "react-bootstrap";

export default function ResourceComment({ comment }: { comment: Comment }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card body className="mb-3">
      <p className="text-black text-end w-100">
        {formatDate(comment.createdAt)}
      </p>
      <p className="text-black" style={{ whiteSpace: "pre" }}>
        {comment.body}
      </p>
    </Card>
  );
}
