"use server";
import { z } from "zod";
import Api from "../api";
import { redirect } from "next/navigation";
import { destroySession, getSession } from "../session";
import { getTranslations } from "next-intl/server";
import { flashError, flashSuccess } from "../flash-messages";
import { snakeCaseKeys } from "../transformKeys";
import { MessageKeys } from "next-intl";
import { revalidatePath } from "next/cache";

/**
 * Initiates a password reset request for "forgot password" flow.
 */
export async function requestPasswordReset({
  email,
  originalPath,
}: {
  email: string;
  originalPath: string;
}) {
  const t = await getTranslations();

  const response = await new Api().post("/auth/password_resets", {
    body: JSON.stringify({ email: email, original_location: originalPath }),
  });

  if (!response.ok) {
    return {
      error: t("shared.genericError"),
    };
  } else {
    flashSuccess(t("password_reset.resetRequestSuccess"), {
      template: "dismissable",
    });

    redirect(originalPath);
  }
}

/**
 * Resend confirmation email to user.
 */
export async function resendConfirmation() {
  const session = await getSession();
  const response = await new Api(session?.apiToken).post(
    "/auth/confirmations/resend"
  );

  if (!response.ok) {
    return false;
  }

  return true;
}

/*
 * Reset password
 */
export interface IPasswordResetsFormState {
  newPassword: string;
  newPasswordConfirm: string;
  token: string;
}

type ResetPasswordResponse = {
  error?: MessageKeys<IntlMessages, "password_reset">;
};

export async function resetPassword({
  newPassword,
  newPasswordConfirm,
  token,
}: IPasswordResetsFormState): Promise<ResetPasswordResponse> {
  const t = await getTranslations();

  const response = await new Api().patch(`/auth/password_resets/${token}`, {
    body: JSON.stringify(
      snakeCaseKeys({
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm,
      })
    ),
  });

  const body = await response.json();
  let error;
  if (!response.ok) {
    error = body?.error
      ? `password_reset.${body.error}`
      : "shared.genericError";
  }

  return { error } as ResetPasswordResponse;
}

export interface IChangePasswordFormState {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

type ChangePasswordResponse = {
  error?: MessageKeys<IntlMessages, "account.changePassword">;
};

export async function changePassword({
  password,
  newPassword,
  newPasswordConfirm,
}: IChangePasswordFormState) {
  const session = await getSession();

  const response = await new Api(session?.apiToken).patch("/profile", {
    body: JSON.stringify(
      snakeCaseKeys({
        password: password,
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm,
      })
    ),
  });

  let error;
  if (!response.ok) {
    error = "account.changePassword.error";
  }

  return { error } as ChangePasswordResponse;
}

export interface IDeleteAccountFormState {
  password: string;
}

export async function deleteAccount({ password }: IDeleteAccountFormState) {
  const session = await getSession();
  const t = await getTranslations();

  const response = await new Api(session?.apiToken).delete(
    `/auth?password=${password}`
  );

  if (!response.ok) {
    flashError(t("account.delete.error"));
    return {
      error: t("account.delete.error"),
    };
  }

  flashSuccess(t("account.delete.success"));
  await destroySession();
}

export async function acknowledgePolicy() {
  const session = await getSession();
  const response = await new Api(session?.apiToken).patch("/profile/policy");

  if (!response.ok) {
    return false;
  }

  revalidatePath("/auth/reauthenticate");
  return true;
}
