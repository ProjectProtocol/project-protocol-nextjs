"use client";

import { useTranslations } from "next-intl";
import Button from "react-bootstrap/Button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations("shared");

  return (
    <div
      className="vertical-rhythm d-flex flex-column justify-content-center align-items-center"
      style={{ height: 500 }}
    >
      <h2>{t("genericError")}</h2>
      <div>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
