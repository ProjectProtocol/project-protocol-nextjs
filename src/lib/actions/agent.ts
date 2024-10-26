"use server";

import { getTranslations } from "next-intl/server";
import { getSession } from "../session";
import Api from "../api";
import { flashError, flashSuccess } from "../flash-messages";
import { revalidatePath } from "next/cache";
import { snakeCaseKeys } from "../transformKeys";
import { SearchData } from "@/types/Search";
import Agent from "@/types/Agent";
import { IRateAgentFormState } from "@/app/[locale]/(app)/rate-my-po/agents/[agentId]/_components/RateAgentForm/types";

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

  revalidatePath(`/rate-my-po/agents/${agentId}`);
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

interface IListAgents {
  officeId: string;
  searchText: string;
  page: number;
}

export async function listAgents({
  officeId,
  searchText = "",
  page = 0,
}: IListAgents): Promise<SearchData<Agent>> {
  const url =
    `offices/${officeId}/agents?` +
    new URLSearchParams({ search: searchText, page: String(page) });
  const response = await new Api().get(url);
  return response.json();
}
