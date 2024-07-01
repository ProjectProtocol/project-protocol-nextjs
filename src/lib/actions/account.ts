import { z } from "zod";
import Api from "../api";
import { redirect } from "next/navigation";

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default async function resetPassword(
  prevState: any,
  formData: FormData
) {
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
