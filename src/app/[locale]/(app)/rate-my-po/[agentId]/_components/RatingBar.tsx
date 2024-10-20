"use client";
import { Col, ProgressBar } from "react-bootstrap";
import { Rating } from "@/types/Review";
import { useEffect, useState } from "react";
import { MessageKeys, useTranslations } from "next-intl";

interface IRatingBar {
  rating: Rating;
  animated?: boolean;
  delay?: number;
}

const labelAnimationStates = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

export default function RatingBar({ rating, animated, delay = 1 }: IRatingBar) {
  const [liveValue, setLiveValue] = useState(animated ? 0 : rating.value);
  const t = useTranslations();

  const localeKey =
    `rate_agent.category.${rating.label.toLowerCase()}.title` as MessageKeys<
      IntlMessages,
      "rate_agent"
    >;
  const label = t(localeKey);

  useEffect(() => {
    function updateValue() {
      setLiveValue(rating.value);
    }

    if (animated) {
      setTimeout(updateValue, 100 * delay);
    }
  }, [rating, animated, delay]);

  return (
    <div className="d-flex flex-row align-items-center w-100 mb-2">
      <Col xs={6}>
        <h4 className="m-0">{label}</h4>
      </Col>
      <Col>
        <ProgressBar
          variant="dark"
          now={liveValue}
          max={5}
          className="align-middle"
          style={{ height: "10px" }}
        />
      </Col>
      <Col xs={1} className="text-center">
        <span>{rating.value}</span>
      </Col>
    </div>
  );
}
