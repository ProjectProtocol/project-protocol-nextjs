"use server";

import { getTranslations } from "next-intl/server";
import { getSession } from "../session";
import Api from "../api";
import { flashError, flashSuccess } from "../flash-messages";
import { revalidatePath } from "next/cache";
import { IRateAgentFormState } from "@/app/(main-layout)/agents/[agentId]/_components/RateAgentForm/types";
import { snakeCase } from "lodash";
import { snakeCaseKeys } from "../transformKeys";

export default async function rateAgent(
  agentId: string,
  review: IRateAgentFormState
) {
  const t = await getTranslations();

  const session = await getSession();
  const api = new Api(session?.apiToken);
  const response = await api.post(`/agents/${agentId}/reviews`, {
    body: JSON.stringify({ review: snakeCaseKeys(review) }),
  });

  if (!response.ok) {
    flashError(t("shared.genericError"));
    return {
      errors: {},
    };
  }

  flashSuccess(
    review.reviewInput
      ? t("rate_agent.createdWithCommentSuccess")
      : t("rate_agent.createdSuccess")
  );

  revalidatePath(`/agents/${agentId}`);
}
