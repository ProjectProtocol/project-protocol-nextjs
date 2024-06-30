import Agent from "@/types/Agent";
import Office from "@/types/Office";
import Api from "../api";
import { SearchData } from "@/types/Search";

interface SearchArgs {
  searchText?: string;
  filter?: "Agent" | "Office" | "";
  page?: number;
}

export async function search({
  searchText = "",
  filter = "",
  page = 0,
}: SearchArgs): Promise<SearchData<Agent | Office>> {
  const params = {
    search: searchText,
    filter: filter?.toString() || "",
    page: page.toString(),
    ...(searchText ? {} : { default: "true" }),
  };

  const url = "search?" + new URLSearchParams(params);

  const res = await new Api().get(url, { params });

  const data = await res.json();

  return { meta: data.meta as any, data: data.data };
}
