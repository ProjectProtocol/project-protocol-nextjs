import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { defaultMetadata } from "@/lib/metadataUtils";
import OriginalPathProvider from "@/components/OriginalPathProvider";
import Document from "@/components/Document";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import NotificationArea from "@/components/notifications/NotificationArea";
import HeapAnalytics from "./_components/HeapAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f06748" }],
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
        <AuthProvider>
          <HeapAnalytics />
          <NotificationArea />
          <OriginalPathProvider>
            {children}
            <Footer />
          </OriginalPathProvider>
        </AuthProvider>
      </NextIntlClientProvider>
    </Document>
  );
}
