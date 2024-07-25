"use client";

import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default async function UnauthorizedCommentArea() {
  const t = useTranslations();
  const router = useRouter();
  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <Button
        className="w-100 w-md-auto"
        onClick={() => {
          router.push("/login/signup");
        }}
      >
        {t("resources.comments.signUpToLeaveComment")}
      </Button>
      <Button
        variant="link"
        onClick={() => {
          router.push("/login");
        }}
      >
        {t("shared.orLogIn")}
      </Button>
    </div>
  );
}
