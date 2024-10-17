import OfficeInfo from "@/components/OfficeInfo";
import PageHeader from "@/components/PageHeader";
import Api from "@/lib/api";
import { metaTitle } from "@/lib/metadataUtils";
import { getSession } from "@/lib/session";
import Office from "@/types/Office";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import businessIcon from "../../../../../../public/images/business.svg";
import { listAgents } from "@/lib/actions/agent";
import OfficeAgentsSearch from "./_components/OfficeAgentsSearch";

export async function generateMetadata({
  params,
}: {
  params: { officeId: string };
}) {
  const { office }: { office: Office } = await new Api()
    .get(`/offices/${params.officeId}`)
    .then((res) => res.json());
  return {
    title: metaTitle(office.street),
  };
}

export default async function Page({
  params,
}: {
  params: { officeId: string };
}) {
  const t = await getTranslations();
  const session = await getSession();
  const officeId = params.officeId;
  const { office } = await new Api(session?.apiToken)
    .get(`/offices/${params.officeId}`)
    .then((res) => res.json());
  const initialData = await listAgents({ officeId });

  async function getMore(page: number) {
    "use server";
    return await listAgents({
      officeId,
      page,
    });
  }

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
              src={businessIcon.src}
              width="0"
              height="0"
              style={{ height: "auto", width: 50 }}
              alt="Office icon"
            />
          </div>
        </div>
        <hr />
        <h3>{t("agent.agents")}</h3>
        <OfficeAgentsSearch initialData={initialData} getMore={getMore} />
      </div>
    </div>
  );
}
