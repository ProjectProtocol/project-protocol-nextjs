"use server";

import { getSession } from "../session";
import Api from "../api";

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
