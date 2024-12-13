import { setRequestLocale } from "next-intl/server";

export default async function Page(
  props: {
    children: React.ReactNode;
    params: Promise<{ slug: string; locale: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  setRequestLocale(params.locale);
  return <div style={{ maxWidth: 600, margin: "0 auto" }}>{children}</div>;
}
