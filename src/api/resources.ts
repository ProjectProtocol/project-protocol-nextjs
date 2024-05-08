import { ResourceTag } from "../../src/lib/types/Resource";
import apiClient from "./client";

interface IResourceListParams {
  search?: string;
  page?: number;
  location?: string;
  distance?: string;
  tags?: ResourceTag[];
}

export async function list(params: IResourceListParams) {
  console.log("what");
  const result = await apiClient
    .get(`resources`, { params })
    .then((r) => r.data)
    .catch(() => false);

  return result;
}

export async function like(id: number) {
  const result = await apiClient
    .post(`resources/${id}/like`)
    .then((r) => r.data)
    .catch(() => false);

  return result;
}

export async function dislike(id: number) {
  const result = await apiClient
    .post(`resources/${id}/dislike`)
    .then((r) => r.data)
    .catch(() => false);

  return result;
}

export async function get(id: string) {
  const result = await apiClient
    .get(`resources/${id}`)
    .then((r) => r.data.resource)
    .catch(() => false);

  return result;
}
