import { getTranslations } from "next-intl/server";
import Api from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import ResourceCard from "../_components/ResourceCard";
import { getSession } from "@/lib/session";

export default async function Page({ params }: { params: { id: string } }) {
  const t = await getTranslations();
  const session = await getSession();
  const { resource } = await new Api(session?.apiToken)
    .get(`/resources/${params.id}`)
    .then((res) => res.json());

  return (
    <div>
      <PageHeader title={""} showBack />
      <ResourceCard resource={resource} />
    </div>
  );
}
