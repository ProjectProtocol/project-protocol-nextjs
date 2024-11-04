import { getUser, signOut } from "@/lib/session";

export async function GET() {
  let user;
  try {
    user = await getUser();
  } catch (e) {
    // TODO: log message about invalid token/clearing session
    await signOut();
  } finally {
    const sanitizedUser = user
      ? {
          email: user?.email,
          isConfirmed: user?.isConfirmed,
          confirmationSentAt: user?.confirmationSentAt,
          isPolicyAcknowledged: user?.isPolicyAcknowledged,
        }
      : null;

    return Response.json(sanitizedUser);
  }
}
