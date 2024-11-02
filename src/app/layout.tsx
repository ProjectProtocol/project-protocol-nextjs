import { defaultMetadata } from "@/lib/metadataUtils";
import { Metadata } from "next";

/**
 * This Layout exists purely to set the root metadata for the site.
 */
export const metadata: Metadata = defaultMetadata();

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
