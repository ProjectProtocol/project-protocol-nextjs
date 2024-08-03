"use server";

import { createSession } from "../session";
import { flashError, flashSuccess } from "../flash-messages";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import Api from "../api";

export interface ILoginFormState {
  loginEmail: string;
  password: string;
  callbackURL?: string;
}

export async function login({
  loginEmail,
  password,
  callbackURL,
}: ILoginFormState) {
  const t = await getTranslations();

  const response = await new Api().post("/auth/sign_in", {
    body: JSON.stringify({
      email: loginEmail,
      password: password,
    }),
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

  if (callbackURL) {
    redirect(String(callbackURL));
  }
}

export interface ISignupFormState {
  signUpEmail: string;
  password: string;
  callbackURL?: string;
}

export async function signUp({
  signUpEmail,
  password,
  callbackURL,
}: ISignupFormState) {
  const t = await getTranslations();

  const response = await new Api().post("/auth/sign_up", {
    body: JSON.stringify({
      email: signUpEmail,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    flashError(t("shared.genericError"));
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

  const { isConfirmed } = data.user;
  flashSuccess(t("login.register.success"));

  return { isConfirmed };
}

export async function confirmAccount(token: string) {
  const t = await getTranslations();
  const response = await new Api().post("/auth/confirmations", {
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    flashError(t("shared.genericError"));
    return false;
  }

  return true;
}
