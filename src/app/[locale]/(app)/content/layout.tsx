export default async function Page({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { slug: string; locale: string };
}) {
  return <div style={{ maxWidth: 600, margin: "0 auto" }}>{children}</div>;
}
