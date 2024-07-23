import { getTranslations } from "next-intl/server";
import Api from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import ResourceCard from "./_components/ResourceCard";

export default async function Page({ params }: { params: { id: string } }) {
  const t = await getTranslations();
  const { resource } = await new Api()
    .get(`/resources/${params.id}`)
    .then((res) => res.json());

  return (
    <div>
      <PageHeader title={""} showBack />
      <ResourceCard {...resource} />
    </div>
  );
}
