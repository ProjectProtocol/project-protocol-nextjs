"use client";

import styles from "@/styles/landing-page.module.scss";
import { CldImage } from "next-cloudinary";

export default function LandingHeroImage() {
  return (
    <CldImage
      priority
      src="landing-page-2_v663w1"
      alt="Palm trees and houses"
      className={styles.topImage}
      sizes="100vw"
      fill
    />
  );
}
