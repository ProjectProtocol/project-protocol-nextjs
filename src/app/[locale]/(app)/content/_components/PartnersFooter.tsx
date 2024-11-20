"use client";
import { CldImage } from "next-cloudinary";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function PartnersFooter() {
  const p = usePathname();
  const t = useTranslations("navigation");
  if (!p.endsWith("/content/what-is-project-protocol")) return null;
  return (
    <div className="bg-black text-center mt-auto py-md-4 pt-4 pb-5">
      <div className="container" style={{ maxWidth: 1048 }}>
        <h2 className="text-white mt-3 mb-5">{t("partners")}</h2>
        <div className="row align-items-center justify-content-center">
          <div className="col-sm text-center">
            <div className="position-relative">
              <CldImage
                src="emergent_works_ppi"
                width="100"
                height="100"
                alt="Emergent Works logo"
                style={{
                  maxWidth: 100,
                  objectFit: "contain",
                  alignSelf: "center",
                }}
              />
            </div>
            <h4 className="text-white mt-4">Emergent Works</h4>
          </div>
          <div className="col-sm text-center">
            <div className="position-relative">
              <CldImage
                src="reimagine_freedom_ppi"
                width="100"
                height="100"
                alt="Reimagine Freedom logo"
                style={{
                  maxWidth: 100,
                  objectFit: "contain",
                  alignSelf: "center",
                }}
              />
            </div>
            <h4 className="text-white mt-1">Reimagine Freedom</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
