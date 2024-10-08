/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "Project Protocol logo";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const logoSrc = await fetch(
    new URL("../../public/images/landing-image.jpeg", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "#f8f7f8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "black",
          }}
        />
        <img
          src={logoSrc as unknown as string} // Crazy hack to make typescript shut up
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            backgroundColor: "black",
            opacity: 0.95,
            filter: "blur(10px)",
            objectFit: "cover",
          }}
          alt="Background image"
        />
        <section
          style={{
            width: 400,
            height: 400,
            display: "flex",
            background: "rgba(255, 255, 255, 0.95)",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="220"
            height="220"
            viewBox="0 0 49.63 55.667"
          >
            <path
              fill="#ffa727"
              d="M973.978,3114.919h-23.5a4.792,4.792,0,0,0-4.793,4.792v11.751h12.656a3.888,3.888,0,0,1,3.888,3.888v12.656h11.751a4.793,4.793,0,0,0,4.792-4.793v-23.5A4.792,4.792,0,0,0,973.978,3114.919Z"
              transform="translate(-929.14 -3114.919)"
            />
            <path
              fill="#f06748"
              d="M945.683,3143.213v-11.751H933.028a3.888,3.888,0,0,0-3.888,3.888v31.341a3.888,3.888,0,0,0,6.341,3.016l5.27-4.286a3.888,3.888,0,0,1,2.453-.872h15.135a3.888,3.888,0,0,0,3.888-3.888v-12.655H950.476A4.793,4.793,0,0,1,945.683,3143.213Z"
              transform="translate(-929.14 -3114.919)"
            />
          </svg>
        </section>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
