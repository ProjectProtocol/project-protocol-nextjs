import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import ResourcesList from "./_components/ResourcesList";
import { Suspense } from "react";
import ResourceSearchBar from "./_components/ResourceSearchBar";
import ResourcesLoadingPlaceholder from "./_components/ResourcesLoadingPlaceholder";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const t = await getTranslations();

  return (
    <div className="vertical-rhythm">
      <PageHeader title={t("resources.title")} />
      <ResourceSearchBar />
      <Suspense fallback={<ResourcesLoadingPlaceholder />}>
        <ResourcesList searchText={searchParams.search} />
      </Suspense>
    </div>
  );
}
