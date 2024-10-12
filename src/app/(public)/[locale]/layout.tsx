import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { metaTitle } from "@/lib/metadataUtils";
import OriginalPathProvider from "@/components/OriginalPathProvider";
import Document from "@/components/Document";
import { routing } from "@/i18n/routing.public";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f06748" }],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "home" });
  const host = process.env.HOST ?? "http://localhost:3001";
  return {
    title: metaTitle(t("title")),
    description: t("welcomeMessage"),
    applicationName: "Project Protocol",
    appleWebApp: {
      title: "Project Protocol",
      statusBarStyle: "default",
    },
    metadataBase: new URL(host),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <Document locale={locale}>
      <NextIntlClientProvider messages={messages}>
        <OriginalPathProvider>
          {children}
          <Footer />
        </OriginalPathProvider>
      </NextIntlClientProvider>
    </Document>
  );
}
