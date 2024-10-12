import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

function IconLink({
  href,
  icon,
  iconHeight,
  text,
}: {
  href: string;
  icon: string;
  text: string;
  iconHeight?: number;
}) {
  return (
    <Link
      href={href}
      className="d-flex flex-column justify-content-center align-items center text-decoration-none"
    >
      <div>
        <Image
          src={icon}
          width={iconHeight ?? 37.5}
          height={iconHeight ?? 37.5}
          alt={`Icon for ${text}`}
        />
      </div>
      <span className="fs-6">{text}</span>
    </Link>
  );
}

export default async function IconLinks({
  classes,
  locale,
  iconHeight,
}: {
  classes?: string;
  locale: string;
  iconHeight?: number;
}) {
  const t = await getTranslations();
  return (
    <Row className={classes}>
      <Col>
        <IconLink
          href={`/content/${locale}/vote`}
          icon="/images/vote_landing.svg"
          text={t("home.voteTitle")}
          iconHeight={iconHeight}
        />
      </Col>
      <Col>
        <IconLink
          href="/rate-my-po"
          icon="/images/search_landing.svg"
          text={t("home.rateMyPoTitle")}
          iconHeight={iconHeight}
        />
      </Col>
      <Col>
        <IconLink
          href="/resources"
          icon="/images/resources_landing.svg"
          text={t("home.resourcesTitle")}
          iconHeight={iconHeight}
        />
      </Col>
    </Row>
  );
}
