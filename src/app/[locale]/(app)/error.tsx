"use client"; // Error components must be Client Components

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("shared");

  // TODO: Send error to sentry

  return (
    <div
      className="vertical-rhythm d-flex flex-column justify-content-center align-items-center"
      style={{ height: 500 }}
    >
      <h2>{t("genericError")}</h2>
      <div>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
