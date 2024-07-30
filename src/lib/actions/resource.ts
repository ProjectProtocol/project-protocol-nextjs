"use server";

import { getSession } from "../session";
import Api from "../api";
import { SearchData } from "@/types/Search";
import Resource, { ResourceSearchParams, ResourceTag } from "@/types/Resource";
import { castArray } from "lodash";

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

export async function searchResources(
  searchParams: ResourceSearchParams = {}
): Promise<SearchData<Resource>> {
  const session = await getSession();
  const api = new Api(session?.apiToken);
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value) {
      if (Array.isArray(value) || key === "tags") {
        const tagsValue = castArray(value);
        tagsValue.forEach((v) => params.append(key + "[]", v));
      } else {
        params.set(key, value);
      }
    }
  }

  const url = "resources?" + params.toString();

  const result = await api.get(url).then((r) => r.json());

  return result;
}
