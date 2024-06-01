"use server";

import { ResourceTag } from "../../src/lib/types/Resource";
import apiClient, { authenticatedClient } from "./client";
import { auth } from "@/app/actions/auth";

interface IResourceListParams {
  search?: string;
  page?: number;
  location?: string;
  distance?: string;
  tags?: ResourceTag[];
}

export async function like(id: number) {
  const session = await auth();
  const client = authenticatedClient(session?.user?.accessToken);
  const result = await client
    .post(`resources/${id}/like`)
    .then((r) => r.data)
    .catch(() => false);

  return result;
}

export async function dislike(id: number) {
  const session = await auth();
  const client = authenticatedClient(session?.user?.accessToken);
  const result = await client
    .post(`resources/${id}/dislike`)
    .then((r) => r.data)
    .catch(() => false);

  return result;
}

export async function get(id: string) {
  const session = await auth();
  const client = authenticatedClient(session?.user?.accessToken);
  const result = await client
    .get(`resources/${id}`)
    .then((r) => r.data.resource)
    .catch(() => false);

  return result;
}
