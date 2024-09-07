"use client";
import styles from "@/styles/landing-page.module.scss";
import { CldImage } from "next-cloudinary";

export default function LandingHeroImage() {
  return (
    <CldImage
      priority
      src="landing-image_ssfynh"
      alt="Palm trees and houses"
      className={styles.topImage}
      sizes="100vw"
      quality={10}
      fill
    />
  );
}
