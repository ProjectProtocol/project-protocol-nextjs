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

const MAX_WIDTH = 720;

function LandingPageSegment({
  children,
  classes,
}: {
  classes?: string;
  children: React.ReactNode;
}) {
  return <section className={"py-5 " + classes}>{children}</section>;
}

export default async function Page() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <main>
      <div className={`position-relative w-100 ${styles.topImageContainer}`}>
        <Image
          priority
          src={landingImage}
          alt="Palm trees and houses"
          className={styles.topImage}
          sizes="100vw"
          placeholder="blur"
          quality={50}
          fill
        />
        <div className={styles.imageOverlay} />

        <Navbar>
          <Container fluid>
            <NavbarBrand
              as={Link}
              href="/"
              className="d-flex flex-row align-items-center"
            >
              <div className="d-md-none">
                <Image
                  priority
                  src="/images/icon.svg"
                  width="20"
                  height="20"
                  className="me-2"
                  alt={"Project Protocol logo"}
                />
              </div>
              <div className="d-none d-md-block me-2">
                <Image
                  priority
                  unoptimized
                  src="/images/icon.svg"
                  width="0"
                  height="0"
                  style={{ width: "25px", height: "auto" }}
                  alt={"Project Protocol logo"}
                />
              </div>
              <span
                className={
                  "w-100 d-md-inline fw-medium pe-auto text-white " +
                  styles.navbarTitle
                }
                style={{ letterSpacing: -0.5 }}
              >
                Project Protocol
              </span>
            </NavbarBrand>
            <LocaleSwitcher locale={locale} dark />
          </Container>
        </Navbar>
      </div>
      <div className="content-page">
        <LandingPageSegment classes="text-center px-4 px-md-0">
          <div className="m-auto" style={{ maxWidth: 720 }}>
            <h1>{t("home.welcomeTitle")}</h1>
            <p>
              {t("home.welcomeMessage")}.{" "}
              <Link href="/content/en-US/about">{t("shared.learnMore")}</Link>
            </p>
            <div className="d-none d-md-block">
              <IconLinks locale={locale} classes="py-3 " iconHeight={75} />
            </div>
          </div>
        </LandingPageSegment>
        <LandingPageSegment classes="bg-white text-center px-4 d-md-none">
          <h2>{t("home.explore")}</h2>
          <IconLinks locale={locale} classes="py-3" />
        </LandingPageSegment>
        <LandingPageSegment classes="text-center px-3 bg-md-white">
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
