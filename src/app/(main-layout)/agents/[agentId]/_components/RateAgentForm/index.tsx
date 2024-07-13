"use client";

import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Alert,
  Button,
  FormCheck,
  FormControl,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import RateAgentRatingRadio from "./RateAgentRatingRadio";
import { IRateAgentFormState } from "./types";
import RateAgentTags from "./RateAgentTags";
import AsyncButton from "@/components/AsyncButton";
import rateAgent from "@/lib/actions/agent";

interface IRateAgentForm {
  onCancel: () => void;
  agentId: string;
}

export default function RateAgentForm({ onCancel, agentId }: IRateAgentForm) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<IRateAgentFormState>({
    mode: "onSubmit",
    defaultValues: {
      helpful: undefined,
      caring: undefined,
      respectful: undefined,
      availability: undefined,
      tags: [],
      reviewInput: "",
    },
  });
  const t = useTranslations();
  const hasErrors = !isEmpty(errors);

  const onError = () => {
    toast.error(t("rate_agent.error"));
  };

  const onHide = () => {
    reset();
    onCancel();
  };

  const onSubmitWrapper = async (data: IRateAgentFormState) => {
    setIsLoading(true);
    await rateAgent(agentId, data);
  };

  const [isCurrentlyOnParole, setIsCurrentlyOnParole] = useState(false);

  const onClick = (value: boolean) => {
    setIsCurrentlyOnParole(value);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitWrapper, onError)}>
      <RateAgentRatingRadio control={control} name="helpful" />
      <RateAgentRatingRadio control={control} name="caring" />
      <RateAgentRatingRadio control={control} name="respectful" />
      <RateAgentRatingRadio control={control} name="availability" />
      <RateAgentTags control={control} />
      <div className="mb-4">
        <h4>{t("rate_agent.currentlyOnParole")}</h4>
        <FormCheck
          type="radio"
          label="No"
          name="currentlyOnParole"
          onChange={() => onClick(false)}
          required
        ></FormCheck>
        <FormCheck
          type="radio"
          label="Yes"
          name="currentlyOnParole"
          onChange={() => onClick(true)}
          required
        ></FormCheck>
      </div>
      <div className="mb-4">
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
          {...register("reviewInput")}
        />
      </div>
      <div className="d-block">
        {hasErrors &&
          Object.values(errors).map(({ message }, i) => (
            <Alert variant="danger" key={`rate-agent-error-${i}`}>
              {message}
            </Alert>
          ))}
      </div>
      <div className="d-grid gap-3">
        <AsyncButton loading={isLoading} size="lg" type="submit">
          {!dirtyFields.reviewInput && t("shared.submit")}
          {dirtyFields.reviewInput && t("rate_agent.submit")}
        </AsyncButton>
        <Button size="lg" onClick={onHide} variant="link link-danger">
          {t("shared.cancel")}
        </Button>
      </div>
    </form>
  );
}
