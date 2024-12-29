"use server";

import { signIn } from "../session";
import { getTranslations } from "next-intl/server";
import Api from "../api";
import { cookies } from "next/headers";
import { ActionResponse } from "@/types/ActionResponse";
import User from "@/types/User";

export interface ILoginFormState {
  loginEmail: string;
  password: string;
}

export async function login({
  loginEmail,
  password,
}: ILoginFormState): Promise<ActionResponse<User>> {
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
  try {
    await signIn(data.user, apiToken, cookies());
    return { data: data.user };
  } catch {
    return {
      error: "Error signing in",
    };
  }
}

export interface ISignupFormState {
  signUpEmail: string;
  password: string;
  joinMailingList?: boolean;
}

export async function signUp({
  signUpEmail,
  password,
  joinMailingList,
}: ISignupFormState): Promise<ActionResponse<User>> {
  const response = await new Api().post("/auth/sign_up", {
    body: JSON.stringify({
      email: signUpEmail,
      password: password,
      join_mailing_list: joinMailingList ? "true" : undefined,
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

  return { data: data.user };
}

/**
 * Attempts to confirm user account with token. If successful, use the returned
 * user object and authorization header to create a session and sign the user in.
 */
export async function confirmAccount(
  token: string
): Promise<ActionResponse<User>> {
  const t = await getTranslations();

  const response = await new Api().post("/auth/confirmations", {
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
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

  return { data: user };
}
