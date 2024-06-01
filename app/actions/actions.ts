"use server";

import { loginSchema } from "@/src/lib/definitions";
import { signIn } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleLogin(prevState: any, formData: FormData) {
  // await signIn("credentials", formData);
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Form validation failed",
    };
  }

  try {
    await signIn("credentials", {
      ...validatedFields.data,
      callbackUrl: prevState.message ? prevState.message : "/",
      redirect: true,
    });
  } catch (error) {
    return {
      message: "Something went wrong",
    };
  }
}
