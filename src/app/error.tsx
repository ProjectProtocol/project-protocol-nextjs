"use client";

import { useEffect } from "react";
import { useRollbar } from "@rollbar/react";

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

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
