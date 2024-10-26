"use client";

import Card from "react-bootstrap/Card";
import { useTranslations } from "next-intl";
import { useAuth } from "@/components/AuthProvider";
import ConfirmationModal from "../agents/[agentId]/_components/ConfirmationModal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";

export default function AddAgentCard() {
  const t = useTranslations();
  const { user } = useAuth();
  const router = useRouter();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const addAgentButtonOnClick = () => {
    user?.isConfirmed
      ? router.push("/rate-my-po/agents/new")
      : setShowConfirmationModal(true);
  };

  return (
    <>
      <Card border="0" className="mb-3">
        <Card.Body className="p-4 text-center vertical-rhythm">
          <h3>{t("rate_my_po.noResults", { ns: "rate_my_po" })}</h3>
          {user ? (
            <Button
              onClick={addAgentButtonOnClick}
              aria-label={t("agent.addAgent")}
              className="w-75 btn btn-lg btn-primary"
            >
              {t("agent.addAgent")}
            </Button>
          ) : (
            <>
              <Link
                href="/auth/sign-up"
                aria-label={t("agent.signUpToAddAgent")}
                className="btn btn-lg btn-primary w-75 mb-3"
              >
                {t("agent.signUpToAddAgent")}
              </Link>
              <Link href="/auth/login" className="d-block">
                {t("shared.orLogIn")}
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        user={user}
        title={t("agent.confirmAccountToAddAgent")}
      />
    </>
  );
}
