"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt, freshExpiryDate, timeToExpiryInMs } from "./jwt";
import { NextRequest, NextResponse } from "next/server";
import User from "@/types/User";
import Api from "./api";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

type Session = {
  user: User;
  apiToken: string;
  expires: Date;
};

/**
 * Retrieves the session from the session cookie.
 * @returns The decrypted session payload if found, otherwise null.
 */
export async function getSession(): Promise<Session | undefined> {
  const session = cookies().get("session")?.value;
  if (!session) return;
  return await decrypt(session);
}

/**
 * Retrieves the user from the session.
 * @returns The user object if session is found, otherwise null.
 */
export async function getUser() {
  const session = await getSession();
  if (!session) return;
  return session.user;
}

/**
 * Updates the session expiration time.
 * Used in middleware.ts to refresh the the API token and the nextjs-managed session cookie when
 * the session is about to expire.
 * @param request - The NextRequest object.
 * @returns The NextResponse object
 */
export async function updateSession(request: NextRequest) {
  const res = NextResponse.next();
  const sessionCookie = request.cookies.get("session")?.value;
  if (!sessionCookie) return;

  const session: Session = await decrypt(sessionCookie);

  const daysLeft = timeToExpiryInMs(session.expires) / (1000 * 60 * 60 * 24);

  if (daysLeft < 1) {
    const response = await new Api(session?.apiToken).get(
      "/auth/reauthenticate",
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      res.cookies.delete("session");
      return res;
    }
    const { user } = await response.json();
    const apiToken = String(response.headers.get("authorization"));

    await signIn(user, apiToken, res.cookies);
  }

  return res;
}

export async function signIn(
  user: User,
  apiToken: string,
  cookieStore: ResponseCookies
) {
  const expires = freshExpiryDate();
  const session = {
    user,
    apiToken,
    expires,
  };

  cookieStore.set({
    name: "session",
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires,
  });
}

/**
 * Signs the user out by deleting the session cookie.
 */
export async function signOut() {
  cookies().delete("session");
}
