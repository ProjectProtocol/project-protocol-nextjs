import { ReactNode } from "react";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import ProgressBarWrapperNoSSR from "./GlobalProgressBar";

const font = Source_Sans_3({ subsets: ["latin"] });

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
