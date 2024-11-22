"use client";
import { CldImage } from "next-cloudinary";
import { Col } from "react-bootstrap";

export default function PartnersCard({
  src,
  label,
  alt,
}: {
  src: string;
  label: string;
  alt: string;
}) {
  return (
    <Col md className="text-center">
      <div className="position-relative mb-3">
        <CldImage
          src={src}
          width="100"
          height="100"
          alt={alt}
          style={{ maxWidth: 100, objectFit: "contain", alignSelf: "center" }}
        />
      </div>
      <h4 className="text-white">{label}</h4>
    </Col>
  );
}
