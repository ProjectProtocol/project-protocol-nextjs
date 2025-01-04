import { setRequestLocale } from "next-intl/server";

export default async function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return <div style={{ maxWidth: 600, margin: "0 auto" }}>{children}</div>;
}
