import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Protocol",
    short_name: "Project Protocol",
    description: "Resources and reviews for folx on parole",
    start_url: "/",
    theme_color: "#f8f7f8",
    background_color: "#ffffff",
    orientation: "portrait",
    display: "standalone",
    id: "/",
    icons: [
      {
        src: "/icon1.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/icon2.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon3.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon4.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/images/screenshot-mobile.png",
        sizes: "750x1334",
        type: "image/jpeg",
      },
      {
        src: "/images/screenshot-wide.jpg",
        sizes: "1080x720",
        type: "image/png",
      },
    ],
  };
}
