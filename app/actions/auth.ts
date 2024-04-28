"use server";

import { ApiSession } from "@/src/api";
import { LoginFormSchema } from "@/src/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  console.log(formData.get("email"));
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const res = await ApiSession.create(email, password);

  console.log(prevState);

  const setCookieHeader =
    res.headers["set-cookie"] && res.headers["set-cookie"][0];

  if (setCookieHeader) {
    const jwt = extractJWT(setCookieHeader);
    const dateString = extractExpiry(setCookieHeader);

    console.log(setCookieHeader.split(";")[2]);

    cookies().set("session", jwt, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(dateString),
    });

    return {
      user: res.data,
    };
  }

  redirect("/");
}

function extractJWT(setCookie: string) {
  return setCookie.split(";")[0].split("=")[1];
}

function extractExpiry(setCookie: string) {
  return setCookie.split(";")[2].split("=")[1];
}

// Tue, 28 May 2024 03:17:18 GMT
