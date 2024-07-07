"use server";

import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { getSession } from "../session";
import Api from "../api";
import { flashError, flashSuccess } from "../flash-messages";
import { revalidatePath } from "next/cache";

export default async function rateAgent(prev: any, formData: FormData) {
  const t = await getTranslations();
  const formSchema = z.object({
    helpful: z.coerce
      .number()
      .int()
      .min(1, t("rate_agent.required", { name: "helpful" }))
      .max(5),
    caring: z.coerce
      .number()
      .int()
      .min(1, t("rate_agent.required", { name: "caring" }))
      .max(5),
    respectful: z.coerce
      .number()
      .int()
      .min(1, t("rate_agent.required", { name: "respectful" }))
      .max(5),
    availability: z.coerce
      .number()
      .int()
      .min(1, t("rate_agent.required", { name: "availability" }))
      .max(5),
    tags: z.array(z.string()),
    review_input: z.string().nullable(),
  });

  const parsedData = formSchema.safeParse({
    helpful: formData.get("helpful"),
    caring: formData.get("caring"),
    respectful: formData.get("respectful"),
    availability: formData.get("availability"),
    tags: formData.getAll("tags[]"),
    review_input: formData.get("review_input"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();
  const api = new Api(session?.apiToken);
  const response = await api.post(
    `/agents/${formData.get("agentId")}/reviews`,
    { body: JSON.stringify({ review: parsedData.data }) }
  );

  if (!response.ok) {
    flashError(t("shared.genericError"));
    return {
      errors: {},
    };
  }

  const commentPresent =
    parsedData.data.review_input && parsedData.data.review_input.length > 0;
  const message = commentPresent
    ? t("rate_agent.createdWithCommentSuccess")
    : t("rate_agent.createdSuccess");
  flashSuccess(message);

  revalidatePath(`/agents/${formData.get("agentId")}`);
}
