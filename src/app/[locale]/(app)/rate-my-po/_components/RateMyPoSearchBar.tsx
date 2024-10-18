"use client";

import SearchBar from "@/components/SearchBar";
import { useTranslations } from "next-intl";
import { debounce } from "lodash-es";
import useSetSearchParams from "@/lib/useSetSearchParams";

export default function RateMyPoSearchbar() {
  const t = useTranslations();
  const [searchParams, setSearchParams] = useSetSearchParams();

  const handleInput = debounce((term?: string) => {
    setSearchParams((nextParams) => {
      if (term) {
        nextParams.set("search", term);
      } else {
        nextParams.delete("search");
      }
      return nextParams;
    });
  }, 500);

  return (
    <SearchBar
      id="search"
      aria-label={t("rate_my_po.placeholder")}
      size="lg"
      placeholder={t("rate_my_po.placeholder")}
      onChange={(e) => handleInput(e.target.value)}
      defaultValue={searchParams.get("search")?.toString()}
      name="search"
      onClear={() => handleInput()}
    />
  );
}
