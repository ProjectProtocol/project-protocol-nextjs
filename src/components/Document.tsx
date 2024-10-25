import { ReactNode } from "react";
import { Source_Sans_3 } from "next/font/google";
import dynamic from "next/dynamic";
import "@/styles/index.scss";

const font = Source_Sans_3({ subsets: ["latin"] });

const ProgressBarWrapperNoSSR = dynamic(
  () => import("@/components/GlobalProgressBar"),
  { ssr: false }
);

export default function Document({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  return (
    <html lang={locale}>
      <body
        className={
          font.className + " w-100 min-vh-100 p-0 bg-light overflow-y-scroll"
        }
      >
        <ProgressBarWrapperNoSSR />
        {children}
      </body>
    </html>
  );
}
