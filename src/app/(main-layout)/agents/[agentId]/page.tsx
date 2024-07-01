import PageHeader from "@/components/PageHeader";

export default function Page({ params }: { params: { agentId: string } }) {
  return (
    <div>
      <PageHeader title={"Agent " + params.agentId} showBack />
    </div>
  );
}
