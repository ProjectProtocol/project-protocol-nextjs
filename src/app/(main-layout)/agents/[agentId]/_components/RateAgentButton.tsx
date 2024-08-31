"use client";

import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import Agent from "@/types/Agent";
import toast from "react-hot-toast";
import RateAgentModal from "./RateAgentModal";
import Link from "next/link";

export default function RateAgentButton({ agent }: { agent: Agent }) {
  const t = useTranslations();
  const { user } = useAuth();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showRateAgentModal, setShowRateAgentModal] = useState(false);

  useEffect(() => {
    setShowRateAgentModal(false);
  }, [agent]);

  const rateButtonOnClick = () => {
    if (!user) return;
    if (user.isConfirmed && !agent.isRateable) {
      toast(t("agent.unrateable"), {
        icon: "ℹ️",
        id: `agent-unrateable-toast`,
        duration: 3000,
      });
      return;
    }

    if (user.isConfirmed) {
      setShowRateAgentModal(true);
    } else {
      setShowConfirmationModal(true);
    }
  };

  return (
    <div>
      {user ? (
        <Button onClick={rateButtonOnClick} className="w-100">
          {t("agent.rateAgent")}
        </Button>
      ) : (
        <Link className="btn btn-primary w-100" href="/auth/signup">
          {t("agent.signUp")}
        </Link>
      )}

      {!user && (
        <div className="text-center">
          <Link href="/auth/login">{t("agent.logIn")}</Link>
        </div>
      )}
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        user={user}
      />
      <RateAgentModal
        agent={agent}
        show={showRateAgentModal}
        onHide={() => setShowRateAgentModal(false)}
      />
    </div>
  );
}
