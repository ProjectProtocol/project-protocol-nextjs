import { auth } from "@/app/actions/auth";
import LoginModal from "@/src/components/LoginModal";
import PPModal from "@/src/components/PPModal";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session) {
    return null;
  }

  return (
    <PPModal>
      <LoginModal />
    </PPModal>
  );
}
