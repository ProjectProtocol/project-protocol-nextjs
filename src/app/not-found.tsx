import BackLink from "@/components/BackLink";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function NotFound() {
  const t = await getTranslations("home");
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="vertical-rhythm text-center">
        <Image src="/images/icon.svg" alt="icon" width={45} height={45} />
        <h1>{t("error.notFound")}</h1>
        <p>{t("error.notFoundMessage")}</p>
        <BackLink className="text-underline">{t("error.homeLink")}</BackLink>
      </div>
    </div>
  );
}
