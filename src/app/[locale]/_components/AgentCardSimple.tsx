import ListItem from "@/components/ListItem";
import Agent from "@/types/Agent";
import { Col, Row } from "react-bootstrap";

export default function AgentCardSimple({ agent }: { agent: Agent }) {
  return (
    <ListItem href={"/rate-my-po/agents/" + agent.id} body>
      <Row>
        <Col>
          <div className="d-flex flex-column">
            <span className="fw-bold">{agent.fullName}</span>
            {agent.office && (
              <small>
                {agent.office.city}, {agent.office.state}
              </small>
            )}
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
    </ListItem>
  );
}
