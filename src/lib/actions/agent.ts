"use server";

import { getTranslations } from "next-intl/server";
import { getSession } from "../session";
import Api from "../api";
import { flashError, flashSuccess } from "../flash-messages";
import { revalidatePath } from "next/cache";
import { IRateAgentFormState } from "@/app/[locale]/(app)/rate-my-po/[agentId]/_components/RateAgentForm/types";
import { replace, snakeCase } from "lodash";
import { snakeCaseKeys } from "../transformKeys";
import { redirect } from "next/navigation";

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

  revalidatePath(`/rate-my-po/${agentId}`);
}

export async function createAgent({
  firstName = "",
  lastName,
  officeId,
}: {
  firstName?: string;
  lastName: string;
  officeId: string;
}) {
  const t = await getTranslations();
  const session = await getSession();
  const agent = snakeCaseKeys({ firstName, lastName, officeId });
  const response = await new Api(session?.apiToken).post(`/agents`, {
    body: JSON.stringify({ agent }),
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return false;
  }
}
