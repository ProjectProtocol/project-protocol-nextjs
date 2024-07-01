"use server";
import { cookies } from "next/headers";
import { decrypt, encrypt, freshExpiryDate } from "./jwt";
import { NextRequest, NextResponse } from "next/server";
import User from "@/types/User";
import Api from "./api";

type Session = {
  user: User;
  apiToken: string;
  expires: Date;
};
/**
 * Retrieves the session from the session cookie.
 * @returns The decrypted session payload if found, otherwise null.
 */
export async function getSession(): Promise<Session | null> {
  const session = cookies().get("session")?.value;
  if (!session) return null;
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
 * Used in middleware.ts to refresh the session expiration time on every request so
 * logged in users don't time out.
 * @param request - The NextRequest object.
 * @returns The NextResponse object with updated session expiration time.
 */
export async function updateSession(request: NextRequest) {
  const res = NextResponse.next();
  const sessionCookie = request.cookies.get("session")?.value;
  if (!sessionCookie) return;

  const session: Session = await decrypt(sessionCookie);
  const response = await new Api(session?.apiToken).get("/auth/reauthenticate");
  if (!response.ok) {
    res.cookies.delete("session");
    return res;
  }

  const { user } = await response.json();
  const apiToken = String(response.headers.get("authorization"));

  // Refresh the session expiration time
  session.expires = freshExpiryDate();
  session.user = user;
  session.apiToken = apiToken;

  // Set the updated session cookie

  res.cookies.set({
    name: "session",
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires,
  });
  return res;
}

/**
 * Creates a new session for the user.
 * @param user - The user object.
 * @param apiToken - The API token.
 */
export async function createSession(user: any, apiToken: string) {
  const expires = freshExpiryDate();
  const session = await encrypt({ user, apiToken, expires });
  cookies().set("session", session, { expires, httpOnly: true });
}

/**
 * Signs the user out by deleting the session cookie.
 */
export async function destroySession() {
  cookies().delete("session");
}
