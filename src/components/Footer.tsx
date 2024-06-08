import Link from "next/link";
import { getTranslations } from "next-intl/server";

type FooterLink = {
  url: string;
  label: string;
};

export default async function Footer() {
  const t = await getTranslations();

  const links = [
    { url: "/about", label: t("navigation.about") },
    { url: "/how-does-it-work", label: t("navigation.howDoesItWork") },
    { url: "/ethical-principles", label: t("navigation.ethicalPrinciples") },
    { url: "/terms-of-service", label: t("navigation.termsOfService") },
    { url: "/contact-us", label: t("navigation.contact") },
  ];

  return (
    <div
      className="bg-dark text-center mt-auto py-md-4 pt-4"
      style={{ paddingBottom: "100px" }}
    >
      {links.map(({ label, url }: FooterLink) => (
        <Link
          key={`footer-link-${label}`}
          className="mx-3 my-3 d-block d-md-inline text-center link-white link-underline-opacity-0"
          href={url}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
