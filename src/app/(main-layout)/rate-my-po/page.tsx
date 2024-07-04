import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import RateMyPoSearchbar from "./_components/RateMyPoSearchBar";
import RateMyPoSearchResults from "./_components/RateMyPoSearchResults";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const t = await getTranslations();

  return (
    <div className="vertical-rhythm">
      <PageHeader title={t("rate_my_po.title")} />
      <RateMyPoSearchbar />
      <Suspense>
        <RateMyPoSearchResults searchText={searchParams?.search} />
      </Suspense>
    </div>
  );
}
