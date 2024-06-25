import { cookies } from "next/headers";
import { decrypt, encrypt, freshExpiryDate } from "./jwt";
import { NextRequest, NextResponse } from "next/server";

export async function getSession() {
  const session = cookies().get("session")?.value; // Retrieve the session cookie value
  if (!session) return null; // If session is not found, return null
  return await decrypt(session); // Decrypt and return the session payload
}

export async function getUser() {
  const session = await getSession();
  if (!session) return null;
  return session.user;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value; // Retrieve the session cookie value from the request
  if (!session) return; // If session is not found, return

  // Refresh the session expiration time
  const parsed = await decrypt(session); // Decrypt the session data
  parsed.expires = freshExpiryDate(); // Set a new expiration time (10 seconds from now)
  const res = NextResponse.next(); // Create a new response
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed), // Encrypt and set the updated session data
    httpOnly: true,
    expires: parsed.expires, // Set the expiration time
  });
  return res; // Return the response
}

export async function createSession(user: any, apiToken: string) {
  const expires = freshExpiryDate(); // Set expiration time to 7 days from now
  const session = await encrypt({ user, apiToken, expires }); // Encrypt the session data
  cookies().set("session", session, { expires, httpOnly: true }); // Set the session cookie
}

export async function destroySession() {
  cookies().set("session", "", { expires: new Date(0) });
}
