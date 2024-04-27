import { SearchData } from "../lib/types/SearchData";
import apiClient from "./client";
import Agent from "../lib/types/Agent";

export async function get(id: string) {
  const result = await apiClient
    .get(`agents/${id}`)
    .then((r) => r.data)
    .catch(() => false);

  return result && result.agent;
}

export async function create(agent: {
  firstName?: string;
  lastName: string;
  officeId: number;
}) {
  return await apiClient
    .post("/agents", { agent })
    .then((r) => r.data)
    .catch(() => false);
}

interface IAgentList {
  officeId: number;
  search?: string;
  page?: number;
}

export async function list({
  officeId,
  ...params
}: IAgentList): Promise<SearchData<Agent>> {
  const result = await apiClient.get(`/offices/${officeId}/agents`, { params });
  return result.data as SearchData<Agent>;
}
