// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Col, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { ApiResources } from "src/api";
import SearchIcon from "src/components/svg/SearchIcon";
import VoteIcon from "src/components/svg/VoteIcon";
// import ResourceCard from "src/components/Resources/ResourceCard";
// import Resource from "../lib/types/Resource";
import ResourcesIcon from "./svg/ResourcesIcon";
import LandingPageCard from "./LandingPageCard";
import losAngeles from "../..public/images/los-angeles.jpg";
import PageHeader from "./PageHeader";
import Link from "next/link";

export default function LandingPage() {
  // const queryClient = useQueryClient();
  // const { data: resourceData } = useQuery<SearchData<Resource>>({
  //   queryKey: ["landingPageResources"],
  //   queryFn: async () => await ApiResources.list({}),
  // });

  // function updateResource({ resource }: { resource: Resource }) {
  //   queryClient.setQueryData(
  //     ["landingPageResources"],
  //     updateQueryItem(resource)
  //   );
  // }

  return (
    <div className="vertical-rhythm">
      <PageHeader title={"Home"} showBack={false} />
      <Row className="g-3">
        <Col xs={12}>
          <div
            className="w-100 position-relative rounded justify-content-end align-items-end  d-flex flex-column"
            style={{
              height: "300px",
              width: "100%",
              background: `url(${losAngeles}) no-repeat center center`,
              backgroundSize: "cover",
            }}
          >
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
                Resources, support, and shared experiences during re-entry
                <br />
                <Link href="/about" className="text-white small text-nowrap">
                  Learn More
                  <i className="bi bi-arrow-right ms-1 align-middle"></i>
                </Link>
              </p>
            </Card>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <LandingPageCard
            href="/resources"
            title={"Search for Re-entry resources"}
            description={
              "Find community vetted resources for your current needs"
            }
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
              <Link to="/resources">{t("home.moreResources")}</Link>
              <i className="bi bi-chevron-right ms-2 align-middle"></i>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div className="d-flex flex-column gap-3">
            {/* {resourceData?.data.slice(0, 3).map((resource: Resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onUpdate={updateResource}
              />
            ))} */}
          </div>
        </Col>
      </Row>
    </div>
  );
}
