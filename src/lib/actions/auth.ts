"use server";

import { z } from "zod";
import { createSession } from "../session";
import { flashError, flashSuccess } from "../flash-messages";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const apiURL: string = process.env.API_URL || "";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function login(prevState: any, formData: FormData) {
  const t = await getTranslations();
  // Validate form data
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Authenticate the user with API
  const response = await fetch(apiURL + "/auth/sign_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(validatedFields.data),
  });
  const data = await response.json();

  if (!response.ok) {
    flashError(t("login.loginFieldsError"));
    return {
      error: data.error,
    };
  }

  const apiToken = response.headers.get("authorization");
  if (!apiToken) {
    return {
      error: "Unable to retrieve API token",
    };
  }

  const { email, isConfirmed, confirmationSentAt } = data.user;
  const user = { email, isConfirmed, confirmationSentAt };
  flashSuccess(t("login.success"));
  await createSession(user, apiToken);

  const redirectURL = formData.get("callbackURL");
  if (redirectURL) {
    redirect(String(redirectURL));
  }
}
