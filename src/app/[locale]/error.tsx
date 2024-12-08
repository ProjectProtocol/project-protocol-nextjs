"use client";

import { useEffect } from "react";
import { useRollbar } from "@rollbar/react";
import ErrorPage from "@/components/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const rollbar = useRollbar();

  useEffect(() => {
    rollbar.error(error);
  }, [error, rollbar]);

  return <ErrorPage reset={reset} />;
}
