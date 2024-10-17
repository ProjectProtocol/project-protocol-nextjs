import PageHeader from "@/components/PageHeader";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ResourcesList from "./_components/ResourcesList";
import { Suspense } from "react";
import ResourceSearchBar from "./_components/ResourceSearchBar";
import ResourcesLoadingPlaceholder from "./_components/ResourcesLoadingPlaceholder";
import { ResourceSearchParams } from "@/types/Resource";
import ResourceFilters from "./_components/ResourceFilters";
import { metaTitle } from "@/lib/metadataUtils";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: metaTitle(t("resources.title")),
    description: t("home.resourcesDescription"),
  };
}

export default async function Page({
  searchParams,
  params: { locale },
}: {
  searchParams: ResourceSearchParams;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader title={t("resources.title")} />
      <div className="vertical-rhythm">
        <ResourceSearchBar />
        <ResourceFilters searchParams={searchParams} />
        <Suspense fallback={<ResourcesLoadingPlaceholder />}>
          <ResourcesList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
