import Api from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import ResourceCard from "../_components/ResourceCard";
import { getSession, getUser } from "@/lib/session";
import Divider from "@/components/Divider";
import ResourceComments from "./_components/ResourceComments";
import UnauthorizedCommentArea from "./_components/UnauthorizedCommentArea";
import CommentArea from "./_components/CommentArea";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user = await getUser();
  const { resource } = await new Api(session?.apiToken)
    .get(`/resources/${params.id}`)
    .then((res) => res.json());

  return (
    <div>
      <PageHeader title={""} showBack />
      <ResourceCard resource={resource} />
      <Divider />
      {!user && <UnauthorizedCommentArea />}
      {user && <CommentArea resource={resource} />}
      <ResourceComments resource={resource} />
    </div>
  );
}
