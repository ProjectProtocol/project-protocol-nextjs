"use client";
import { CldImage } from "next-cloudinary";
import { Col, Row, Collapse } from "react-bootstrap";
import { useState } from "react";
import renderRichText from "@/lib/renderRichText";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import { Placeholder } from "react-bootstrap";

export interface TeamMemberProps {
  name: string;
  title: string;
  bio: Document;
  imgId?: string;
}

export default function TeamMember({
  name,
  title,
  bio,
  imgId,
}: TeamMemberProps) {
  const [showBio, setShowBio] = useState(false);
  const handleBio = () => {
    setShowBio(!showBio);
  };
  return (
    <>
      <Row className="mb-3" onClick={handleBio}>
        <Col xs={4} sm={3} className="text-left">
          <div className="position-relative">
            {imgId ? (
              <CldImage
                src={imgId}
                width="100"
                height="100"
                alt={name}
                style={{
                  maxWidth: 100,
                  objectFit: "contain",
                  alignSelf: "center",
                }}
              />
            ) : (
              <Placeholder as={Image} width={100} height={100} />
            )}
          </div>
        </Col>
        <Col xs={8} sm={9} className="text-left">
          <h2>{name}</h2>
          <h3>{title}</h3>
        </Col>
      </Row>
      <Collapse in={showBio}>
        <Row>{renderRichText(bio)}</Row>
      </Collapse>
    </>
  );
}
