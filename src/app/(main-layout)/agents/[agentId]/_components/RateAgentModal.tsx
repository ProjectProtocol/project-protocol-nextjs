import PopUp, { IPopUp } from "@/components/PopUp";
import Agent from "@/types/Agent";
import { useTranslations } from "next-intl";
import RatingRadio from "./RatingRadio";

interface RateAgentModalProps {
  agent: Agent;
  onSubmit: () => void;
}

export default function RateAgentModal({
  agent,
  onSubmit,
  show,
  onHide,
}: RateAgentModalProps & IPopUp) {
  const t = useTranslations("rate_agent");
  return (
    <PopUp
      title={t("title")}
      show={show}
      fullscreen="sm-down"
      onHide={onHide}
      bodyClass="pb-5 px-4"
      closeButton
      centered={false}
    >
      <h1>RateAgentModal</h1>
      <RatingRadio name="helpful" />
      <RatingRadio name="caring" />
      <RatingRadio name="respectful" />
      <RatingRadio name="availability" />
    </PopUp>
  );
}
