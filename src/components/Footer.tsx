import Link from "next/link";
import useTranslation from "../lib/util/dummyTranslation";

type FooterLink = {
  url: string;
  label: string;
};

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { url: "/about", label: t("footer.about") },
    { url: "/how-does-it-work", label: t("footer.howDoesItWork") },
    { url: "/ethical-principles", label: t("footer.ethicalPrinciples") },
    { url: "/terms-of-service", label: t("footer.tos") },
    { url: "/contact-us", label: t("footer.contact") },
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
