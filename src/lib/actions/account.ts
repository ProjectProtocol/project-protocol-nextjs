"use server";
import { z } from "zod";
import Api from "../api";
import { redirect } from "next/navigation";
import { getSession } from "../session";
import { getTranslations } from "next-intl/server";
import { flash, flashError, flashSuccess } from "../flash-messages";
import { snakeCaseKeys } from "../transformKeys";

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function resetPassword(prevState: any, formData: FormData) {
  const validatedFields = resetPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await new Api().post("/auth/password_resets", {
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    return {
      error: "Invalid email or password",
    };
  }

  redirect("/");
}

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

  const response = await new Api(session?.apiToken).delete("/auth", {
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    flashError(t("account.delete.error"));
    return {
      error: t("account.delete.error"),
    };
  }

  flashSuccess(t("account.delete.success"));
  redirect("/");
}
