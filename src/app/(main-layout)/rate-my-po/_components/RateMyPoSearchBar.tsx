"use client";

import SearchBar from "@/components/SearchBar";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { debounce } from "lodash-es";

export default function RateMyPoSearchbar() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const handleInput = debounce((term?: string) => {
    const searchParams = new URLSearchParams(params);
    if (term) {
      searchParams.set("search", term);
    } else {
      searchParams.delete("search");
    }
    router.replace(`${pathname}?${searchParams.toString()}`);
  }, 500);

  return (
    <SearchBar
      id="search"
      aria-label={t("rate_my_po.placeholder")}
      size="lg"
      placeholder={t("rate_my_po.placeholder")}
      onChange={(e) => handleInput(e.target.value)}
      defaultValue={params.get("search")?.toString()}
      name="search"
      onClear={() => handleInput()}
    />
  );
}
