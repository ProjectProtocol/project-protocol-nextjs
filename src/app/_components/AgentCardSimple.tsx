import Agent from "@/types/Agent";
import Link from "next/link";
import { Card, Col, Row } from "react-bootstrap";

export default function AgentCardSimple({ agent }: { agent: Agent }) {
  return (
    <Card
      body
      className="shadow-none"
      as={Link}
      href={"/rate-my-po/" + agent.id}
    >
      <Row>
        <Col>
          <div className="d-flex flex-column">
            <span className="fw-bold">{agent.fullName}</span>
            <small>
              {agent.office.city}, {agent.office.state}
            </small>
          </div>
        </Col>
        <Col>
          <div className="text-end fw-bold ">
            <span className="m-0">{agent.averageRating}</span>
            <span className="small" style={{ bottom: -3 }}>
              /5
            </span>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
