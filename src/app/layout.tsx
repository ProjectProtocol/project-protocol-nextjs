import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import AuthProvider from "@/components/AuthProvider";
import { getUser } from "@/lib/session";
import NotificationArea from "@/components/notifications/NotificationArea";
import dynamic from "next/dynamic";

const ProgressBarWrapperNoSSR = dynamic(
  () => import("@/components/GlobalProgressBar"),
  { ssr: false }
);

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
          <AuthProvider user={user}>{children}</AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
