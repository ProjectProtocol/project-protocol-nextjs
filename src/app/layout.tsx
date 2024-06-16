import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const font = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Protocol",
  description: "Resources and reviews for folx on parole",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={font.className + " w-100 vh-100 p-0"}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
