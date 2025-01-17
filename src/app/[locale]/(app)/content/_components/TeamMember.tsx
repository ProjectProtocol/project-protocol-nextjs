"use client";

import { CldImage } from "next-cloudinary";
import { Col, Row, Collapse } from "react-bootstrap";
import { useState } from "react";
import renderRichText from "@/lib/renderRichText";
import { Document } from "@contentful/rich-text-types";
import { ContentfulTeamMember } from "@/lib/contentful/team-member";

export interface TeamMemberProps {
  teamMember: ContentfulTeamMember;
}

export default function TeamMember({ teamMember }: TeamMemberProps) {
  const [showBio, setShowBio] = useState(false);
  const handleBio = () => {
    setShowBio(!showBio);
  };
  return (
    <>
      <Row className="align-items-center" role="button" onClick={handleBio}>
        <Col xs={4} sm={3} className="text-left">
          <div className="position-relative">
            <CldImage
              src={teamMember.cloudinaryId}
              width="100"
              height="100"
              alt={teamMember.name}
              style={{
                maxWidth: 100,
                objectFit: "cover",
                objectPosition: "top",
                alignSelf: "top",
                display: "block",
              }}
            />
          </div>
        </Col>
        <Col xs={8} sm={9} className="text-left">
          <h2 className="mb-1">{teamMember.name}</h2>
          <p className="my-0 py-0">{teamMember.jobTitle}</p>
        </Col>
      </Row>
      <Collapse in={showBio}>
        <div>{renderRichText(teamMember.bio.json)}</div>
      </Collapse>
    </>
  );
}
