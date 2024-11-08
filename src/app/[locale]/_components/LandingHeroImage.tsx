import styles from "@/styles/landing-page.module.scss";
import landingImage from "@public/images/landing-page.webp";
import Image from "next/image";

export default function LandingHeroImage() {
  return (
    <Image
      src={landingImage}
      quality={100}
      placeholder="blur"
      alt="Palm trees and houses"
      className={styles.topImage}
      sizes="100vw"
      fill
    />
  );
}
