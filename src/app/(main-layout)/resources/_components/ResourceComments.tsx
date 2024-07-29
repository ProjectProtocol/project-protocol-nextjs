import Resource from "@/types/Resource";
import { listComments } from "@/lib/actions/resource";
import ResourceCommentsList from "./ResourceCommentsList";

export default async function ResourceComments({
  resource,
}: {
  resource: Resource;
}) {
  const initialData = await listComments(resource.id);

  return (
    <ResourceCommentsList resourceId={resource.id} initialData={initialData} />
  );
}
