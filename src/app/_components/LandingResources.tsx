import Api from "@/lib/api";
import Resource from "@/types/Resource";
import { SearchData } from "@/types/Search";
import ResourceCardSimple from "./ResourceCardSimple";

async function getResources() {
  const res = await new Api().get("resources?page_size=3");
  return res.json();
}

export default async function LandingResources() {
  const resources: SearchData<Resource> = await getResources();

  return (
    <div className="vertical-rhythm">
      {resources.data.map((resource) => (
        <ResourceCardSimple key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
