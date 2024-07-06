"use server";
import { z } from "zod";
import Api from "../api";
import { redirect } from "next/navigation";
import { getSession } from "../session";

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
