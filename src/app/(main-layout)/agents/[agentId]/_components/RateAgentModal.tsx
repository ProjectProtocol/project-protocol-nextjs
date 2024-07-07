"use client";

import PopUp, { IPopUp } from "@/components/PopUp";
import Agent from "@/types/Agent";
import { useTranslations } from "next-intl";
import RatingRadio from "./RatingRadio";
import RateAgentTags from "./RateAgentTags";
import { useFormState } from "react-dom";
import rateAgent from "@/lib/actions/agent";
import {
  Alert,
  Button,
  FormCheck,
  FormControl,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import AsyncButton from "@/components/AsyncButton";

interface RateAgentModalProps {
  agent: Agent;
  onSubmit: () => void;
}

type RateAgentErrors = {
  helpful?: string[];
  caring?: string[];
  respectful?: string[];
  availability?: string[];
  tags?: string[];
  reviewInput?: string[];
};

const initialState = {
  errors: {},
};

function getErrorMessage(fieldName: string, errors: any) {
  return errors?.[fieldName];
}

export default function RateAgentModal({
  agent,
  onSubmit,
  show,
  onHide,
}: RateAgentModalProps & IPopUp) {
  const t = useTranslations();
  const [state, formAction] = useFormState(rateAgent, initialState);
  const [isCurrentlyOnParole, setIsCurrentlyOnParole] = useState<boolean>();
  const [errors, setErrors] = useState<RateAgentErrors>(state?.errors ?? {});

  useEffect(() => {
    setErrors(state?.errors ?? {});
  }, [state?.errors]);

  return (
    <PopUp
      title={t("rate_agent.title")}
      show={show}
      fullscreen="sm-down"
      onHide={onHide}
      bodyClass="pb-5 px-4"
      closeButton
      centered={false}
    >
      <div className="vertical-rhythm">
        <h1>RateAgentModal</h1>
        <form action={formAction} className="vertical-rhythm">
          <input type="hidden" name="agentId" value={agent.id} />
          {["helpful", "caring", "respectful", "availability"].map((name) => (
            <RatingRadio
              key={`rating-radio-${name}`}
              name={name as any}
              errorMessage={getErrorMessage(name, errors)}
              clearErrors={() => {
                setErrors((errors) => {
                  delete errors[name as keyof RateAgentErrors];
                  return { ...errors };
                });
              }}
            />
          ))}
          <RateAgentTags />
          <div className="mb-4">
            <h4>{t("rate_agent.currentlyOnParole")}</h4>
            <FormCheck
              type="radio"
              label="No"
              name="isCurrentlyOnParole"
              onChange={() => setIsCurrentlyOnParole(false)}
              required
            />
            <FormCheck
              type="radio"
              label="Yes"
              name="isCurrentlyOnParole"
              onChange={() => setIsCurrentlyOnParole(true)}
              required
            />
          </div>
          <h4 className={isCurrentlyOnParole ? "text-muted" : ""}>
            {t("rate_agent.additionalComments") + " " + t("shared.optional")}
          </h4>
          <p className={isCurrentlyOnParole ? "text-muted" : ""}>
            {t("rate_agent.additionalCommentsHelpText")}
            <OverlayTrigger
              placement="right"
              overlay={
                <Popover>
                  <Popover.Body>
                    {t("rate_agent.additionalCommentsTooltip")}
                  </Popover.Body>
                </Popover>
              }
            >
              <i className="bi bi-info-circle ms-1"></i>
            </OverlayTrigger>
          </p>
          <FormControl
            as="textarea"
            placeholder={
              isCurrentlyOnParole
                ? t("rate_agent.additionalCommentsDisabled")
                : t("rate_agent.additionalCommentsPlaceholder")
            }
            rows={2}
            disabled={isCurrentlyOnParole}
            name="review_input"
            defaultValue=""
          />
          <div className="d-block">
            {Object.values(errors).map((message, i) => (
              <Alert variant="danger" key={`rate-agent-error-${i}`}>
                {message.join(", ")}
              </Alert>
            ))}
          </div>
          <div className="d-grid gap-3">
            <AsyncButton size="lg" type="submit">
              {/* {t("shared.submit")} */}
              {t("rate_agent.submit")}
            </AsyncButton>
            <Button size="lg" onClick={onHide} variant="link link-danger">
              {t("shared.cancel")}
            </Button>
          </div>
        </form>
      </div>
    </PopUp>
  );
}
