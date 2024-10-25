"use client";

import PopUp, { IPopUp } from "@/components/PopUp";
import Agent from "@/types/Agent";
import { useTranslations } from "next-intl";
import AgentInfo from "@/components/AgentInfo";
import RateAgentForm from "./RateAgentForm";

interface RateAgentModalProps {
  agent: Agent;
  onHide: () => void;
}

export default function RateAgentModal({
  agent,
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
      <div className="vertical-rhythm">
        <AgentInfo agent={agent} />
        <hr />
        <RateAgentForm agentId={agent.id} onCancel={onHide} />
      </div>
    </PopUp>
  );
}
