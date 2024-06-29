"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { encrypt, freshExpiryDate } from "../jwt";
import { cookies } from "next/headers";
import { createSession } from "../session";

const apiURL: string = process.env.API_URL || "";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function login(prevState: any, formData: FormData) {
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

  if (!response.ok) {
    return {
      error: "Invalid email or password",
    };
  }

  const data = await response.json();
  const apiToken = response.headers.get("authorization");
  if (!apiToken) {
    return {
      error: "Unable to retrieve API token",
    };
  }

  const { email, isConfirmed, confirmationSentAt } = data.user;
  const user = { email, isConfirmed, confirmationSentAt };

  await createSession(user, apiToken);
}
