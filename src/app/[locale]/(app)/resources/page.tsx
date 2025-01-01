import PageHeader from "@/components/PageHeader";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ResourcesList from "./_components/ResourcesList";
import { Suspense } from "react";
import ResourceSearchBar from "./_components/ResourceSearchBar";
import ResourcesLoadingPlaceholder from "./_components/ResourcesLoadingPlaceholder";
import { ResourceSearchParams } from "@/types/Resource";
import ResourceFilters from "./_components/ResourceFilters";
import { defaultMetadata } from "@/lib/metadataUtils";

export async function generateMetadata() {
  const t = await getTranslations();
  return defaultMetadata({
    title: t("resources.title"),
    description: t("home.resourcesDescription"),
  });
}

export default async function Page(
  props: {
    searchParams: Promise<ResourceSearchParams>;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const searchParams = await props.searchParams;
  setRequestLocale(locale);
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
