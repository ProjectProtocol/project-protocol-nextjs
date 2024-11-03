import { getUser, signOut } from "@/lib/session";

export async function GET() {
  let user;
  try {
    user = await getUser();
  } catch (e) {
    // TODO: log message about invalid token/clearing session
    await signOut();
  } finally {
    return Response.json(user || null);
  }
}
