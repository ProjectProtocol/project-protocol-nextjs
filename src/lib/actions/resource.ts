"use server";

import { getSession } from "../session";
import Api from "../api";
import { SearchData } from "@/types/Search";
import Resource from "@/types/Resource";

export async function like(id: number) {
  const session = await getSession();
  const api = new Api(session?.apiToken);
  const result = await api.post(`/resources/${id}/like`).then((r) => r.json());

  return result.resource;
}

export async function dislike(id: number) {
  const session = await getSession();
  const api = new Api(session?.apiToken);
  const result = await api
    .post(`/resources/${id}/dislike`)
    .then((r) => r.json());

  return result.resource;
}

export async function searchResources({
  search = "",
  page = 0,
}): Promise<SearchData<Resource>> {
  const session = await getSession();
  const api = new Api(session?.apiToken);
  const params = {
    search,
    page: String(page),
  };

  const url = "resources?" + new URLSearchParams(params);

  const result = await api.get(url).then((r) => r.json());

  return result;
}
