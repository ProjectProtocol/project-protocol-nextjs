import PopUp, { IPopUp } from "@/components/PopUp";
import Agent from "@/types/Agent";
import { useTranslations } from "next-intl";
import RatingRadio from "./RatingRadio";
import RateAgentTags from "./RateAgentTags";
import { useFormState } from "react-dom";
import rateAgent from "@/lib/actions/agent";

interface RateAgentModalProps {
  agent: Agent;
  onSubmit: () => void;
}

const initialState = {};

export default function RateAgentModal({
  agent,
  onSubmit,
  show,
  onHide,
}: RateAgentModalProps & IPopUp) {
  const t = useTranslations("rate_agent");
  const [state, formAction] = useFormState(rateAgent, initialState);
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
      <form action={formAction}>
        <RatingRadio name="helpful" />
        <RatingRadio name="caring" />
        <RatingRadio name="respectful" />
        <RatingRadio name="availability" />
        <RateAgentTags />
        <button type="submit">Submit</button>
      </form>
    </PopUp>
  );
}
