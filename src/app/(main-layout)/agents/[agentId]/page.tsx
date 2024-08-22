import AgentInfo from "@/components/AgentInfo";
import PageHeader from "@/components/PageHeader";
import Api from "@/lib/api";
import RateAgentButton from "./_components/RateAgentButton";
import { getTranslations } from "next-intl/server";
import RatingBar from "./_components/RatingBar";
import { Rating } from "@/types/Review";
import TagBadge from "@/components/TagBadge";
import { Tag, tagsTranslationMap } from "@/types/Tag";
import Divider from "@/components/Divider";
import AgentReviews from "./_components/AgentReviews";
import { Suspense } from "react";
import { getSession } from "@/lib/session";
import Agent from "@/types/Agent";
import { metaTitle } from "@/lib/metadataUtils";

export async function generateMetadata({
  params,
}: {
  params: { agentId: string };
}) {
  const { agent }: { agent: Agent } = await new Api()
    .get(`/agents/${params.agentId}`)
    .then((res) => res.json());
  return {
    title: metaTitle(agent.fullName),
  };
}

export default async function Page({
  params,
}: {
  params: { agentId: string };
}) {
  const t = await getTranslations();
  const session = await getSession();
  const { agent } = await new Api(session?.apiToken)
    .get(`/agents/${params.agentId}`)
    .then((res) => res.json());

  return (
    <div>
      <PageHeader title={""} showBack />
      <div className="vertical-rhythm">
        <div className="d-flex flex-row">
          <div className="w-100">
            <AgentInfo agent={agent} large />
          </div>
          <div className="d-flex flex-column justify-content-end">
            <div
              className="position-relative mb-3 text-center"
              style={{ minWidth: 150 }}
            >
              <h4 className="mb-0">{t("agent.averageRatingTitle")}</h4>
              <span className="h2 fw-bold m-0">{agent.averageRating}</span>
              <span
                className="fw-bold"
                style={{ marginLeft: 2, position: "relative", top: -10 }}
              >
                /5
              </span>
            </div>
            <RateAgentButton agent={agent} />
          </div>
        </div>
        <div className="mb-4">
          <div className="fw-normal mb-2 small">
            {t("agent.overallRatings")}
          </div>
          {agent.overallStats.map((r: Rating, i: number) => (
            <RatingBar
              key={`overall-rating-${i}`}
              rating={r}
              delay={i}
              animated={true}
            />
          ))}
        </div>
        <div className="mb-4">
          <div className="fw-normal mb-2 small">{t("agent.popularTags")}</div>
          {agent.topTags.map((tag: Tag, i: number) => (
            <TagBadge
              label={t(tagsTranslationMap[tag.name])}
              className="me-2 mb-2 p-2"
              key={`agent-detail-tag-${i}`}
            />
          ))}
        </div>
        <Divider />
        <div className="vertical-rhythm" style={{ marginBottom: 100 }}>
          <Suspense>
            <AgentReviews agent={agent} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
