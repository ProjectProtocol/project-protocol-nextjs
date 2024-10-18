import PageHeader from "@/components/PageHeader";

export default function Page({ params }: { params: { officeId: string } }) {
  return (
    <div>
      <PageHeader title={"Office " + params.officeId} showBack />
    </div>
  );
}
