import Api from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import ResourceCard from "../_components/ResourceCard";
import { getSession } from "@/lib/session";
import Divider from "@/components/Divider";
import ResourceComments from "./_components/ResourceComments";
import UnauthorizedCommentArea from "./_components/UnauthorizedCommentArea";
import CommentArea from "./_components/CommentArea";
import { Suspense } from "react";
import ResourcesLoadingPlaceholder from "../_components/ResourcesLoadingPlaceholder";
import { metaTitle } from "@/lib/metadataUtils";
import { getTranslations } from "next-intl/server";
import { ResourceTag } from "@/types/Resource";

export async function generateMetadata({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  const t = await getTranslations({ locale });
  const { resource } = await new Api()
    .get(`/resources/${id}`)
    .then((res) => res.json());

  return {
    title: metaTitle(resource.name),
    description: resource.description,
  };
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;
  const { resource } = await new Api(session?.apiToken)
    .get(`/resources/${id}`)
    .then((res) => res.json());

  return (
    <div>
      <PageHeader title={""} showBack />
      <ResourceCard resource={resource} />
      <Divider />
      {!user ? (
        <UnauthorizedCommentArea />
      ) : (
        <CommentArea resource={resource} />
      )}
      <Suspense fallback={<ResourcesLoadingPlaceholder />}>
        <ResourceComments resource={resource} />
      </Suspense>
    </div>
  );
}
