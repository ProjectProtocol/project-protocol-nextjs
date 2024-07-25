"use server";
import { z } from "zod";
import Api from "../api";
import { redirect } from "next/navigation";
import { destroySession, getSession } from "../session";
import { getTranslations } from "next-intl/server";
import { flashError, flashSuccess } from "../flash-messages";
import { snakeCaseKeys } from "../transformKeys";
import { MessageKeys } from "next-intl";

/**
 * Initiates a password reset request for "forgot password" flow.
 */
export async function requestPasswordReset(_: any, formData: FormData) {
  const t = await getTranslations();

  const requestPasswordResetSchema = z.object({
    email: z.string().email(t("login.emailMessage")),
  });

  const validatedFields = requestPasswordResetSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await new Api().post("/auth/password_resets", {
    body: JSON.stringify({ ...validatedFields.data, original_location: "/" }),
  });

  if (!response.ok) {
    return {
      error: t("shared.genericError"),
    };
  } else {
    flashSuccess(t("password_reset.resetRequestSuccess"), {
      template: "dismissable",
    });

    redirect("/");
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

export async function resetPassword({
  newPassword,
  newPasswordConfirm,
  token,
}: IPasswordResetsFormState) {
  const t = await getTranslations();
  let messageKey;

  const response = await new Api().patch(`/auth/password_resets/${token}`, {
    body: JSON.stringify({
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    }),
  });

  const { message, error } = await response.json();

  if (!response.ok) {
    if (error) {
      messageKey = `password_reset.${error}`;
    } else {
      messageKey = "shared.genericError";
    }
    flashError(t(messageKey as MessageKeys<IntlMessages, "password_reset">));
  } else {
    messageKey = `password_reset.${message}`;
    flashSuccess(t(messageKey as MessageKeys<IntlMessages, "password_reset">));
  }

  redirect("/");
}

export async function changePassword(prevState: any, formData: FormData) {
  const session = await getSession();
  const t = await getTranslations();

  const changePasswordSchema = z
    .object({
      password: z.string(),
      newPassword: z.string().min(8, t("account.changePassword.detail")),
      newPasswordConfirm: z.string().min(8, t("account.changePassword.detail")),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
      message: t("password_reset.newPasswordConfirmMismatch"),
      path: ["newPasswordConfirm"],
    });

  const validatedFields = changePasswordSchema.safeParse({
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
    newPasswordConfirm: formData.get("newPasswordConfirm"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await new Api(session?.apiToken).patch("/profile", {
    body: JSON.stringify(snakeCaseKeys(validatedFields.data)),
  });

  if (!response.ok) {
    return {
      error: t("account.changePassword.error"),
    };
  }

  flashSuccess(t("account.changePassword.success.heading"));
}

export async function deleteAccount(prevState: any, formData: FormData) {
  const session = await getSession();
  const t = await getTranslations();

  const deleteAccountSchema = z.object({
    password: z.string(),
  });

  const validatedFields = deleteAccountSchema.safeParse({
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await new Api(session?.apiToken).delete(
    `/auth?password=${validatedFields.data.password}`
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
