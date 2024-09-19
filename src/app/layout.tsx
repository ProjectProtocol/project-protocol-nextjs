import type { Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import AuthProvider from "@/components/AuthProvider";
import { getUser } from "@/lib/session";
import NotificationArea from "@/components/notifications/NotificationArea";
import dynamic from "next/dynamic";
import { metaTitle } from "@/lib/metadataUtils";
import OriginalPathProvider from "@/components/OriginalPathProvider";

const ProgressBarWrapperNoSSR = dynamic(
  () => import("@/components/GlobalProgressBar"),
  { ssr: false }
);

const font = Source_Sans_3({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f06748" }],
};

export async function generateMetadata() {
  const t = await getTranslations();
  const host = process.env.HOST ?? "http://localhost:3001";
  return {
    title: metaTitle(t("home.title")),
    description: t("home.welcomeMessage"),
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={
          font.className + " w-100 min-vh-100 p-0 bg-light overflow-y-scroll"
        }
      >
        <ProgressBarWrapperNoSSR />
        <NextIntlClientProvider messages={messages}>
          <NotificationArea />
          <OriginalPathProvider>
            <AuthProvider user={user}>{children}</AuthProvider>
          </OriginalPathProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
