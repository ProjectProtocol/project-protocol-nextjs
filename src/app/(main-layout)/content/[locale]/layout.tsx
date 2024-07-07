import { getLocale } from "next-intl/server";
import RedirectLocale from "./_components/RedirectLocale";

export default async function Page({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { slug: string; locale: string };
}) {
  const currentLocale = await getLocale();

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <RedirectLocale
        pathLocale={params.locale}
        currentLocale={currentLocale}
      />
      {children}
    </div>
  );
}
