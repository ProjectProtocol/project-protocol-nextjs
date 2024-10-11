"use server";

import { signIn } from "../session";
import { flashError, flashSuccess } from "../flash-messages";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import Api from "../api";
import { cookies } from "next/headers";

export interface ILoginFormState {
  loginEmail: string;
  password: string;
}

export async function login({ loginEmail, password }: ILoginFormState) {
  const t = await getTranslations();

  const response = await new Api().post("/auth/sign_in", {
    body: JSON.stringify({
      email: loginEmail,
      password: password,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
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

  await signIn(data.user, apiToken, cookies());
}

export interface ISignupFormState {
  signUpEmail: string;
  password: string;
}

export async function signUp({ signUpEmail, password }: ISignupFormState) {
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
    flashError(t("shared.genericError"));
    return {
      error: "Unable to retrieve API token",
    };
  }

  const { email, isConfirmed } = data.user;

  await signIn(data.user, apiToken, cookies());

  flashSuccess(t("login.register.success"));

  return { email, isConfirmed };
}

/**
 * Attempts to confirm user account with token. If successful, use the returned
 * user object and authorization header to create a session and sign the user in.
 *
 * @param token {string}
 * @returns {null | Error}
 */
export async function confirmAccount(token: string) {
  const t = await getTranslations();

  const response = await new Api().post("/auth/confirmations", {
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    flashError(t("shared.genericError"));
    throw new Error("Confirm account: something went wrong");
  }

  const { user } = await response.json();
  const apiToken = response.headers.get("authorization");

  if (!user) {
    throw new Error("Confirm account: Unable to parse user");
  }

  if (!apiToken) {
    throw new Error("Confirm account: No api token present in response");
  }

  await signIn(user, apiToken, cookies());
}
