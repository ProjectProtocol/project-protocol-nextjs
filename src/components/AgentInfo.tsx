import { useTranslations } from "next-intl";
import Agent from "../types/Agent";
import classNames from "classnames";

interface IAgentInfo {
  /** An `Agent` object */
  agent: Agent;
  large?: boolean;
}

/** Repeatable UI pattern for basic agent info */
export default function AgentInfo({ agent, large = false }: IAgentInfo) {
  const t = useTranslations();
  return (
    <div className="d-flex flex-column">
      <span className={classNames("m-0 large", { h2: large, h4: !large })}>
        {agent.firstName
          ? `${agent.lastName}, ${agent.firstName}`
          : agent.lastName}
      </span>
      <span className="mb-1 text-dark h4 lh-sm">{t("agent.agent")}</span>
      <p className="m-0 lh-sm">{agent.office.street}</p>
      <p className="m-0 lh-sm">
        {agent.office.city}, {agent.office.state} {agent.office.zip}
      </p>
    </div>
  );
}
