"use client";
import BackLink from "@/components/BackLink";
import { useRollbar } from "@rollbar/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
// eslint-disable-next-line no-restricted-imports
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const t = useTranslations("home");
  const tShared = useTranslations("shared");

  const rollbar = useRollbar();
  const pathname = usePathname();

  useEffect(() => {
    rollbar.error(`Page not found: ${pathname}`);
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="vertical-rhythm text-center">
        <Image src="/images/icon.svg" alt="icon" width={45} height={45} />
        <h1>{t("error.notFound")}</h1>
        <p>{t("error.notFoundMessage")}</p>
        <BackLink className="text-underline">{tShared("back")}</BackLink>
      </div>
    </div>
  );
}
