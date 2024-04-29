"use server";

import { ApiSession } from "@/src/api";
import { LoginFormSchema } from "@/src/lib/definitions";
import { AnyARecord } from "dns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * LOGIN
 * 1. Validate the form data
 * 2. Extract the email and password from the form data
 * 3. Authenticate user with the API
 * 4. Extract JWT session token from the response and store in browser cookies
 * @param prevState
 * @param formData
 * @returns
 */

export async function login(prevState: any, formData: FormData) {
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

  const { headers, data } = await ApiSession.create(email, password);

  try {
    const jwtSetCookieHeader =
      headers["set-cookie"] && headers["set-cookie"][0];

    createSessionCookie(jwtSetCookieHeader);
  } catch (error) {
    console.log("Unable to create session", error);
    return {
      message: "Invalid email or password",
    };
  }
}

export async function logout() {
  console.log("OK?");
  cookies().delete("jwt");
  redirect("/");
}

export async function reauthenticate() {
  const token = cookies().get("jwt")?.value;

  if (!token) {
    console.error("No token found in cookies");
    return false;
  }

  const { data, headers } = await ApiSession.reauthenticate({ token }).catch(
    (e) => console.log("Whoops", e)
  );

  // const jwtSetCookieHeader = headers["set-cookie"] && headers["set-cookie"][0];

  // createSessionCookie(jwtSetCookieHeader);

  return data;
}

function createSessionCookie(setCookieHeader?: string) {
  if (!setCookieHeader) {
    throw new Error("No set-cookie header provided");
  }

  const jwt = setCookieHeader.split(";")[0].split("=")[1];
  const dateString = setCookieHeader.split(";")[2].split("=")[1];
  const expiryDate = new Date(dateString);
  cookies().delete("jwt");
  cookies().set({
    name: "jwt",
    value: jwt,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: expiryDate,
  });
}
