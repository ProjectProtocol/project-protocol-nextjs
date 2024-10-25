import { Col, Row } from "react-bootstrap";
import RatingsBadge from "@/components/RatingsBadge";
import { useTranslations } from "next-intl";
import Agent from "@/types/Agent";
import ListItem from "@/components/ListItem";

export default function SearchResultAgentSimple({ agent }: { agent: Agent }) {
  const t = useTranslations();

  return (
    <>
      <ListItem body href={"/rate-my-po/agents/" + agent.id}>
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
      </ListItem>
    </>
  );
}
