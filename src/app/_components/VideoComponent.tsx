"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import styles from "@/styles/landing-page.module.scss";

export default function VideoComponent() {
  return (
    <div className={`m-auto pt-2 ${styles.videoEmbed}`}>
      <CldVideoPlayer
        width="1280"
        height="720"
        src="Project_Protocol_pz6wow"
        fontFace="Source Sans 3"
        poster="propro_video_poster_thz2rw"
        id="landing-page-how-to"
        logo={false}
        colors={{
          accent: "#f06748",
        }}
      />
    </div>
  );
}
