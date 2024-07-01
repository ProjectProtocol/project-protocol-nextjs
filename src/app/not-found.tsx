import BackLink from "@/components/BackLink";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="vertical-rhythm text-center">
        <Image src="/images/icon.svg" alt="icon" width={45} height={45} />
        <h1>{t("shared.notFound")}</h1>
        <BackLink className="text-underline">{t("shared.back")}</BackLink>
      </div>
    </div>
  );
}
