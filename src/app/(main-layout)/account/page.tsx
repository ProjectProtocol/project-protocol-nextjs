import { destroySession, getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  return (
    <form
      action={async () => {
        "use server";
        await destroySession();
      }}
    >
      <button type="submit">Sign out {user.email}</button>
    </form>
  );
}
