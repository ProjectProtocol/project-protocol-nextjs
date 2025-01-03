import OfficeInfo from "@/components/OfficeInfo";
import PageHeader from "@/components/PageHeader";
import Api from "@/lib/api";
import Office from "@/types/Office";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";
import OfficeAgentsSearchBar from "./_components/OfficeAgentsSearchBar";
import OfficeAgentsSearchResultsList from "./_components/OfficeAgentsSearchResults";

export async function generateMetadata({
  params,
}: {
  params: { officeId: string };
}) {
  const { office }: { office: Office } = await new Api()
    .get(`/offices/${params.officeId}`)
    .then((res) => res.json());
  return {
    title: office.city + " Office",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { officeId: string; locale: string };
  searchParams: { search: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations();
  const { office } = await new Api()
    .get(`/offices/${params.officeId}`)
    .then((res) => res.json());

  return (
    <div>
      <PageHeader title="" showBack />
      <div className="vertical-rhythm">
        <div className="d-flex flex-row align-items-center">
          <div className="w-100">
            <OfficeInfo office={office} large />
          </div>
          <div className="h-100 d-flex flex-column justify-content-end px-3">
            <Image
              src={"/images/business.svg"}
              width="0"
              height="0"
              style={{ height: "auto", width: 50 }}
              alt="Office icon"
            />
          </div>
        </div>
        <hr />
        <h3>{t("agent.agents")}</h3>
        <Suspense>
          <OfficeAgentsSearchBar />
          <OfficeAgentsSearchResultsList
            officeId={params.officeId}
            searchText={searchParams.search}
          />
        </Suspense>
      </div>
    </div>
  );
}
