import Api from "@/lib/api";
import { getSession } from "@/lib/session";
import Agent from "@/types/Agent";
import ReviewCard from "./ReviewCard";
import { Review } from "@/types/Review";
import AnimatedList from "@/components/AnimatedList";
import { getTranslations } from "next-intl/server";

export default async function AgentReviews({ agent }: { agent: Agent }) {
  const session = await getSession();
  const t = await getTranslations();
  const data = await new Api(session?.apiToken)
    .get(`/agents/${agent.id}/reviews`)
    .then((res) => res.json());

  return (
    <AnimatedList>
      <h4 className="mb-3">{t("agent.ratings", { count: data.length })}</h4>
      {data.map((review: Review, index: number) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </AnimatedList>
  );
}
