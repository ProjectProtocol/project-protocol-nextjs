export type SearchMeta = {
  total: number;
  page: number;
  totalPages: number;
};

export type Page<T> = {
  data: T[];
  meta: SearchMeta;
};

export type SearchData<T> = {
  meta: SearchMeta;
  data: T[];
};
