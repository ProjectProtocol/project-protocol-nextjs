import { Card, Col, Row } from "react-bootstrap";
import Agent from "@/types/Agent";
import RatingsBadge from "@/components/RatingsBadge";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

interface SearchResultAgentI {
  agent: Agent;
}

export default function SearchResultAgentSimple({ agent }: SearchResultAgentI) {
  const t = useTranslations();

  return (
    <>
      <Card
        body
        className="mb-3 shadow-sm"
        as={Link}
        href={"/rate-my-po/agents/" + agent.id}
      >
        <Card.Body>
          <Row>
            <Col>
              <div className="h-100 d-flex flex-column justify-content-center">
                <h4 className="mb-0">
                  {agent.lastName}, {agent.firstName}
                </h4>
                <h5 className="text-dark">{t("agent.agent")}</h5>
              </div>
            </Col>
            <Col className="text-end">
              <RatingsBadge rating={agent.averageRating} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
