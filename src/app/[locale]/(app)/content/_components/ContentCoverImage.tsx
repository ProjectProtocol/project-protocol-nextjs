"use client";

import Image from "next/image";
import styles from "./content-cover-image.module.scss";
import { CldImage } from "next-cloudinary";

export default function ContentCoverImage({
  coverImageSrc,
  title,
}: {
  coverImageSrc: string;
  title: string;
}) {
  return (
    <div style={{ height: 350 }}>
      <div
        className="w-100 position-absolute"
        style={{ height: 350, left: 0, right: 0 }}
      >
        <CldImage
          src={coverImageSrc}
          sizes="100vw"
          priority
          fill
          style={{ objectFit: "cover" }}
          alt={`Cover image for ${title}`}
        />
        <div className={styles.coverImageOverlay} />
        <div
          className="position-relative d-flex flex-column justify-content-end"
          style={{
            position: "absolute",
            maxWidth: 600,
            margin: "0 auto",
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <h1 className="pb-3 ps-3 ps-md-0 text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
}
