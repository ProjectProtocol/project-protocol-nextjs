import { SearchMeta } from "@/types/Search";
import { useTranslations } from "next-intl";

interface ISearchResultsInfo {
  meta: SearchMeta;
}

export default function SearchResultsInfo({ meta }: ISearchResultsInfo) {
  const t = useTranslations();
  return meta.total === 0 ? (
    <p className="p-4 text-center text-dark fw-normal">
      {t("shared.noResults")}
    </p>
  ) : (
    <p>{t("rate_my_po.resultsDisplayed", { total: meta.total })}</p>
  );
}
