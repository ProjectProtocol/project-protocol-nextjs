import { getTranslations, setRequestLocale } from "next-intl/server";
import styles from "@/styles/landing-page.module.scss";
import { Link } from "@/i18n/routing";
import { Link as NextIntlLink } from "@/i18n/routing";
import IconLinks from "./_components/IconLinks";
import LandingResources from "./_components/LandingResources";
import { Suspense } from "react";
import SegmentLoading from "./_components/SegmentLoading";
import LandingReviews from "./_components/LandingReviews";
import "@/styles/content-pages.scss";
import VideoComponent from "./_components/VideoComponent";
import LandingHeroImage from "./_components/LandingHeroImage";
import LandingPageHeader from "./_components/LandingPageHeader";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";

const MAX_WIDTH = 720;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function LandingPageSegment({
  children,
  classes,
}: {
  classes?: string;
  children: React.ReactNode;
}) {
  return <section className={"py-5 " + classes}>{children}</section>;
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main>
      <div className={`position-relative w-100 ${styles.topImageContainer}`}>
        <LandingHeroImage />
        <div className={styles.imageOverlay} />
        <div
          className="position-absolute text-white w-100 d-md-none"
          style={{ bottom: 0 }}
        >
          <div className="d-flex flex-column justy-content-center align-items-center pb-1">
            <h1>{t("home.welcomeTitle")}</h1>
            <p className="px-5 text-center">
              {t("home.welcomeMessage")}{" "}
              <NextIntlLink href="/content/about" className="link-white">
                {t("shared.learnMore")}
              </NextIntlLink>
            </p>
          </div>
        </div>
      </div>
      <LandingPageHeader locale={locale} />
      <div className="content-page mt-0">
        {/* Desktop Explore Segment */}
        <LandingPageSegment classes="text-center px-4 px-md-0 d-none d-md-block">
          <div className="m-auto" style={{ maxWidth: MAX_WIDTH }}>
            <h1>{t("home.welcomeTitle")}</h1>
            <p>
              {t("home.welcomeMessage")}.{" "}
              <Link href="/content/about">{t("shared.learnMore")}</Link>
            </p>
            <div>
              <IconLinks classes="py-3 " iconHeight={75} />
            </div>
          </div>
        </LandingPageSegment>
        {/* Mobile explore segment */}
        <LandingPageSegment classes="text-center px-4 d-md-none">
          <h2 className="mb-3">{t("home.explore")}</h2>
          <IconLinks />
        </LandingPageSegment>
        <LandingPageSegment classes="text-center px-3 bg-white">
          <h2>{t("home.learnHowToRate")}</h2>
          <div className="h-100 w-100">
            <VideoComponent />
          </div>
        </LandingPageSegment>
        <LandingPageSegment classes="px-3">
          <div
            className="m-auto vertical-rhythm"
            style={{ maxWidth: MAX_WIDTH }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <h2 className="p-0 m-0">{t("home.recentResources")}</h2>
              <NextIntlLink href="/resources">
                {t("home.moreResources")}
                <i className="bi bi-chevron-right align-middle"></i>
              </NextIntlLink>
            </div>
            <Suspense fallback={<SegmentLoading />}>
              <LandingResources />
            </Suspense>
          </div>
        </LandingPageSegment>
        <LandingPageSegment classes="px-3">
          <div
            className="m-auto vertical-rhythm"
            style={{ maxWidth: MAX_WIDTH }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <h2 className="p-0 m-0">{t("home.recentReviews")}</h2>
              <NextIntlLink href="/rate-my-po">
                {t("home.searchAndRate")}
                <i className="bi bi-chevron-right align-middle"></i>
              </NextIntlLink>
            </div>
            <Suspense fallback={<SegmentLoading />}>
              <LandingReviews />
            </Suspense>
          </div>
        </LandingPageSegment>
      </div>
    </main>
  );
}
