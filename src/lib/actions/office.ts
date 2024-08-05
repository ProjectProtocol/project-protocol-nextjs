"use server";

import Office from "@/types/Office";
import Api from "../api";
import { SearchData } from "@/types/Search";

interface IListOfficesParams {
  page: number;
  search: string;
}
export async function listOffices({
  page = 0,
  search = "",
}): Promise<SearchData<Office>> {
  const url = `offices?page=${page}&search=${search}`;
  const result = await new Api().get(url);
  const data = await result.json();
  return data;
}
