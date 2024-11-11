import PageHeader from "@/components/PageHeader";
import { getTranslations, setRequestLocale } from "next-intl/server";
import officerIcon from "@/../public/images/officer-icon.svg";
import Image from "next/image";
import AddAgentForm from "./_components/AddAgentForm";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <PageHeader title={t("agent.addAgent")} showBack />
      <div className="vertical-rhythm">
        <div
          className="d-flex flex-row m-auto justify-content-center align-items-center bg-white rounded-circle my-4"
          style={{ width: 80, height: 80 }}
        >
          <Image
            width={40}
            height={40}
            src={officerIcon.src}
            alt={t("agent.officerIconAlt")}
          />
        </div>
        <p className="mb-5">{t("agent.addAgentDescription")}</p>
        <AddAgentForm />
      </div>
    </div>
  );
}
