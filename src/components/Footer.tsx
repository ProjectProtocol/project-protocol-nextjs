import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("navigation");
  const urlPrefix = (path: string) => `/content/${path}`;

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

  const socialMediaLinks = [
    {
      url: "https://www.instagram.com/project.protocol",
      icon: "instagram",
    },
    {
      url: "https://www.facebook.com/projectprotocol/",
      icon: "facebook",
    },
    {
      url: "https://www.tiktok.com/@projectprotocol",
      icon: "tiktok",
    },
    {
      url: "https://www.linkedin.com/company/projectprotocol/",
      icon: "linkedin",
    },
  ];

  return (
    <div className="bg-dark text-center mt-auto py-md-4 pt-4 pb-5 mb-5 mb-md-0">
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
      <span className="d-flex flex-wrap justify-content-center my-3">
        {socialMediaLinks.map(({ url, icon }) => (
          <a
            key={`social-link-${icon}`}
            href={url}
            target="_blank"
            className="mx-3 my-3 d-block d-md-inline text-center link-white link-underline-opacity-0"
          >
            <i className={`bi bi-${icon} fs-1`}></i>
          </a>
        ))}
      </span>
    </div>
  );
}
