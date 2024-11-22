"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { Container, Row } from "react-bootstrap";
import PartnersCard from "./PartnersCard";
import { MENU_MAX_WIDTH } from "@/components/Menu/Menu";

export default function PartnersFooter() {
  const p = usePathname();
  const t = useTranslations("navigation");
  if (!p.endsWith("/content/what-is-project-protocol")) return null;
  return (
    <div className="bg-black text-center mt-auto py-md-4 pt-4 pb-5">
      <Container style={{ maxWidth: MENU_MAX_WIDTH }}>
        <h2 className="text-white mt-3 mb-5">{t("partners")}</h2>
        <Row>
          <PartnersCard
            src="emergent_works_ppi"
            label="Emergent Works"
            alt="Emergent Works logo"
          />
          <PartnersCard
            src="reimagine_freedom_ppi"
            label="Reimagine Freedom"
            alt="Reimagine Freedom logo"
          />
        </Row>
      </Container>
    </div>
  );
}
