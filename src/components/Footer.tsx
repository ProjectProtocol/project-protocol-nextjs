import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Footer() {
  const t = await getTranslations("navigation");
  const locale = await getLocale();
  const urlPrefix = (path: string) => `/content/${locale}/${path}`;
  const links = [
    {
      url: urlPrefix("what-is-project-protocol"),
      label: t("whatIsProjectProtocol"),
    },
    {
      url: urlPrefix("how-it-works"),
      label: t("howItWorks"),
    },
    {
      url: urlPrefix("the-team"),
      label: t("theTeam"),
    },
    {
      url: urlPrefix("ethical-principles"),
      label: t("ethicalPrinciples"),
    },
    {
      url: urlPrefix("terms-of-service"),
      label: t("termsOfService"),
    },
    { url: urlPrefix("contact-us"), label: t("contact") },
    {
      url: `https://youngwomenfree.app.neoncrm.com/forms/project-protocol`,
      label: t("donate"),
      target: "_blank",
    },
  ];

  return (
    <div
      className="bg-dark text-center mt-auto py-md-4 pt-4"
      style={{ paddingBottom: "100px" }}
    >
      {links.map(({ label, url, target }) => (
        <Link
          key={`footer-link-${label}`}
          className="mx-3 my-3 d-block d-md-inline text-center link-white link-underline-opacity-0"
          href={url}
          target={target || "_self"}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
