import { listAgents } from "@/lib/actions/agent";
import OfficeAgentsResultsList from "./OfficeAgentsResultsList";

type OfficeAgentsSearchResultsProps = {
  officeId: string;
  searchText?: string;
};

export default async function OfficeAgentsSearchResultsList({
  officeId,
  searchText,
}: OfficeAgentsSearchResultsProps) {
  const initialData = await listAgents({ officeId, searchText });

  async function getMore(page: number) {
    "use server";
    return await listAgents({
      officeId,
      searchText,
      page,
    });
  }

  return (
    <OfficeAgentsResultsList
      initialData={initialData}
      getMore={getMore}
      searchText={searchText}
    />
  );
}
