import { auth, signOut } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { Button } from "react-bootstrap";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Account</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
