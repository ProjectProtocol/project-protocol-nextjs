"use server";

import { getSession } from "../session";
import Api from "../api";
import { SearchData, Page } from "@/types/Search";
import Resource, { ResourceSearchParams } from "@/types/Resource";
import { castArray } from "lodash";
import { flashError, flashSuccess } from "../flash-messages";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function like(id: number) {
  const session = await getSession();
  const result = await new Api(session?.apiToken)
    .post(`/resources/${id}/like`)
    .then((r) => r.json());

  return result.resource;
}

export async function dislike(id: number) {
  const session = await getSession();
  const result = await new Api(session?.apiToken)
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

export async function listComments(
  id: number,
  page: number = 0
): Promise<Page<Comment>> {
  const session = await getSession();
  const params = {
    page: String(page),
  };

  const result = await new Api(session?.apiToken)
    .get(`/resources/${id}/comments`, { params })
    .then((r) => r.json());

  return result;
}

export async function createComment(id: number, { body }: { body: string }) {
  const t = await getTranslations();
  const session = await getSession();
  const params = {
    comment: {
      body: body,
    },
  };

  const result = await new Api(session?.apiToken).post(
    `/resources/${id}/comments`,
    { body: JSON.stringify(params) }
  );

  if (!result.ok) {
    flashError(t("shared.genericError"));
    return {
      errors: {},
    };
  }

  flashSuccess(t("resources.commentCreatedSuccess"));
  revalidatePath(`/resources/${id}`);
  revalidatePath(`/resources/${id}/comments`);

  return { ok: true };
}
