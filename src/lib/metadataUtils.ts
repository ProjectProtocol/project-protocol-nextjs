import { Metadata } from "next";

export function defaultMetadata(overrides: Metadata = {}): Metadata {
  const metadataBase = new URL("https://project-protocol-staging.netlify.app");
  return {
    title: {
      template: "%s | Project Protocol",
      default: "Project Protocol",
    },
    description: "We are empowering people in their reentry journey.",
    applicationName: "Project Protocol",
    appleWebApp: {
      title: "Project Protocol",
      statusBarStyle: "default",
    },
    metadataBase,
    ...overrides,
  };
}
