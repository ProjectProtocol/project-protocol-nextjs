import { logout, reauthenticate } from "@/app/actions/auth";
import User from "@/src/lib/types/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "react-bootstrap";

async function getUser(): Promise<User> {
  const { user } = await reauthenticate();

  return user;
}

export default async function Page() {
  const user = await getUser();

  const logOut = async () => {
    "use server";
    cookies().delete("jwt");
    redirect("/");
  };

  return (
    <div>
      <h1>Hello, {user.email}</h1>
      <form action={logOut}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
