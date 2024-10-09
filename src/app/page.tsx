import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import styles from "@/styles/landing-page.module.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import IconLinks from "./_components/IconLinks";
import LandingResources from "./_components/LandingResources";
import { Suspense } from "react";
import SegmentLoading from "./_components/SegmentLoading";
import LandingReviews from "./_components/LandingReviews";
import Footer from "@/components/Footer";
import "@/styles/content-pages.scss";
import landingImage from "@/../public/images/landing-image.jpeg";
import VideoComponent from "./_components/VideoComponent";
import { CldImage } from "next-cloudinary";
import LandingHeroImage from "./_components/LandingHeroImage";
import LandingPageHeader from "./_components/LandingPageHeader";

const MAX_WIDTH = 720;

function LandingPageSegment({
  children,
  classes,
}: {
  classes?: string;
  children: React.ReactNode;
}) {
  return <section className={"py-3 " + classes}>{children}</section>;
}

export default async function Page() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <main>
      <div className={`position-relative w-100 ${styles.topImageContainer}`}>
        <LandingHeroImage />
        <div className={styles.imageOverlay} />
        <LandingPageHeader locale={locale} />
        <div
          className="position-absolute text-white w-100 d-md-none"
          style={{ bottom: 0 }}
        >
          <div className="d-flex flex-column justy-content-center align-items-center p-3">
            <h1>{t("home.welcomeTitle")}</h1>
            <p>
              {t("home.welcomeMessage")}.{" "}
              <Link href="/content/en-US/about" className="link-white">
                {t("shared.learnMore")}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="content-page mt-0">
        {/* Desktop Explore Segment */}
        <LandingPageSegment classes="text-center px-4 px-md-0 d-none d-md-block">
          <div className="m-auto" style={{ maxWidth: 720 }}>
            <h1>{t("home.welcomeTitle")}</h1>
            <p>
              {t("home.welcomeMessage")}.{" "}
              <Link href="/content/en-US/about">{t("shared.learnMore")}</Link>
            </p>
            <div>
              <IconLinks locale={locale} classes="py-3 " iconHeight={75} />
            </div>
          </div>
        </LandingPageSegment>
        {/* Mobile explore segment */}
        <LandingPageSegment classes="text-center px-4 d-md-none mt-0">
          <h2 className="mb-3">{t("home.explore")}</h2>
          <IconLinks locale={locale} />
        </LandingPageSegment>
        <LandingPageSegment classes="text-center px-3 bg-white">
          <h2>{t("home.learnHowToRate")}</h2>
          <div className="h-100 w-100">
            <VideoComponent />
          </div>
        </LandingPageSegment>
        <LandingPageSegment classes="px-3">
          <div className="m-auto vertical-rhythm" style={{ maxWidth: 720 }}>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <h2 className="p-0 m-0">{t("home.recentResources")}</h2>
              <Link href="/resources">
                {t("home.moreResources")}
                <i className="bi bi-chevron-right align-middle"></i>
              </Link>
            </div>
            <Suspense fallback={<SegmentLoading />}>
              <LandingResources />
            </Suspense>
          </div>
        </LandingPageSegment>
        <LandingPageSegment classes="px-3">
          <div className="m-auto vertical-rhythm" style={{ maxWidth: 720 }}>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <h2 className="p-0 m-0">{t("home.recentReviews")}</h2>
              <Link href="/rate-my-po">
                {t("home.searchAndRate")}
                <i className="bi bi-chevron-right align-middle"></i>
              </Link>
            </div>
            <Suspense fallback={<SegmentLoading />}>
              <LandingReviews />
            </Suspense>
          </div>
        </LandingPageSegment>
      </div>
      <Footer />
    </main>
  );
}
