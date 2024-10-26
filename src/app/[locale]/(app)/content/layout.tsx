import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { slug: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  return <div style={{ maxWidth: 600, margin: "0 auto" }}>{children}</div>;
}
