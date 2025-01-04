"use client";

import dynamic from "next/dynamic";

// Wrap the component in dynamic to prevent server-side-rendering,
// to ensure it has access to the window object.
const GlobalProgressBar = dynamic(
  () => import("@/components/GlobalProgressBar/ProgressBar"),
  { ssr: false }
);

export default GlobalProgressBar;
