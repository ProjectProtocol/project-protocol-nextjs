import ResourceCard from "./ResourceCard";
import Resource from "@/src/lib/types/Resource";
import { auth } from "@/app/actions/auth";

export const COLLECTION_TAG = "latest-resources";

async function getResources() {
  const session = await auth();
  const res = await fetch(process.env.API_URL + "/resources?page_size=3", {
    next: { tags: [COLLECTION_TAG] },
    headers: {
      authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const { data } = await res.json();

  return data;
}

export default async function LatestResources() {
  const resources = await getResources();

  return (
    <div className="d-flex flex-column gap-3">
      {resources.map((resource: Resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
