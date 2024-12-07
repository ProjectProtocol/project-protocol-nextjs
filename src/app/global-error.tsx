"use client";

import { useEffect } from "react";
import Rollbar from "rollbar";
import { clientConfig } from "@/rollbar";
import ErrorPage from "@/components/ErrorPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    const rollbar = new Rollbar(clientConfig);
    rollbar.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h1>Global error</h1>
        <ErrorPage reset={reset} />
      </body>
    </html>
  );
}
