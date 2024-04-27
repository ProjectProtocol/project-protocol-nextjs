import { Card, Col, Row } from "react-bootstrap";
import SearchIcon from "./svg/SearchIcon";
import VoteIcon from "./svg/VoteIcon";
import ResourceCard from "./resources/ResourceCard";
import ResourcesIcon from "./svg/ResourcesIcon";
import LandingPageCard from "./LandingPageCard";
import losAngeles from "../../public/images/cedric-letsch-UZVlSjrIJ3o-unsplash.jpg";
import PageHeader from "./PageHeader";
import Link from "next/link";
import useTranslation from "../lib/util/dummyTranslation";
import Image from "next/image";
import Resource from "../lib/types/Resource";

export default function LandingPage({ resources }: { resources: Resource[] }) {
  const { t } = useTranslation();

  return (
    <div className="vertical-rhythm">
      <PageHeader title={"Home"} showBack={false} />
      <Row className="g-3">
        <Col xs={12}>
          <div
            className="w-100 position-relative rounded justify-content-end align-items-end d-flex flex-column overflow-hidden"
            style={{
              height: "300px",
              width: "100%",
            }}
          >
            <Image
              src={losAngeles.src}
              alt="Los Angeles"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="position-absolute"
            />
            <Card
              body
              className="w-100 text-start text-lg-end rounded-top-0"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(3px)",
              }}
            >
              <h4 className="text-white">{t("home.welcomeTitle")}</h4>
              <p className="text-white m-0">
                {t("home.welcomeMessage")}
                <br />
                <Link href="/about" className="text-white small text-nowrap">
                  {t("ui.learnMore")}
                  <i className="bi bi-arrow-right ms-1 align-middle"></i>
                </Link>
              </p>
            </Card>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <LandingPageCard
            href="/resources"
            title={t("home.resourcesTitle")}
            description={t("home.resourcesDescription")}
            cardClass="bg-light-cobalt"
            icon={<ResourcesIcon />}
          />
        </Col>
        <Col xs={6} md={4} style={{ minWidth: "150px" }}>
          <LandingPageCard
            href="/rate-my-po"
            title={t("home.rateMyPoTitle")}
            description={t("home.rateMyPoDescription")}
            cardClass="bg-loquat"
            icon={<SearchIcon />}
          />
        </Col>
        <Col xs={6} md={4} style={{ minWidth: "150px" }}>
          <LandingPageCard
            href="/vote"
            title={t("home.voteTitle")}
            description={t("home.voteDescription")}
            cardClass="bg-secondary"
            icon={<VoteIcon />}
          />
        </Col>
        <Col xs={12}>
          <div className="d-flex flex-row justify-content-between mt-3 align-items-center">
            <h3 className="m-0">{t("home.recentResources")}</h3>
            <div>
              <Link href="/resources">{t("home.moreResources")}</Link>
              <i className="bi bi-chevron-right ms-2 align-middle"></i>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div className="d-flex flex-column gap-3">
            {resources.map((resource: Resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onUpdate={() => {}}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
