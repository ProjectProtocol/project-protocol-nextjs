import PageHeader from "@/components/PageHeader";
import { getTranslations } from "next-intl/server";
import ResourcesList from "./_components/ResourcesList";
import { Suspense } from "react";
import ResourceSearchBar from "./_components/ResourceSearchBar";
import ResourcesLoadingPlaceholder from "./_components/ResourcesLoadingPlaceholder";
import { ResourceSearchParams } from "@/types/Resource";
import ResourceFilters from "./_components/ResourceFilters";

export default async function Page({
  searchParams,
}: {
  searchParams: ResourceSearchParams;
}) {
  const t = await getTranslations();

  return (
    <div className="vertical-rhythm">
      <PageHeader title={t("resources.title")} />
      <ResourceSearchBar />
      <ResourceFilters searchParams={searchParams} />
      <Suspense fallback={<ResourcesLoadingPlaceholder />}>
        <ResourcesList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
