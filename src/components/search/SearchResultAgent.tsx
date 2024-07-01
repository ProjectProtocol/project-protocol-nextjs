import { Col, Row } from "react-bootstrap";
import Agent from "@/types/Agent";
import RatingsBadge from "../RatingsBadge";
import AgentInfo from "../AgentInfo";

interface SearchResultAgentI {
  agent: Agent;
}

export default function SearchResultAgent({ agent }: SearchResultAgentI) {
  return (
    <>
      <Row>
        <Col>
          <AgentInfo agent={agent} />
        </Col>
        <Col xs="auto">
          <RatingsBadge rating={agent.averageRating} />
        </Col>
      </Row>
    </>
  );
}
