"use client";

import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../../../../../../components/ConfirmationModal";
import Agent from "@/types/Agent";
import toast from "react-hot-toast";
import RateAgentModal from "./RateAgentModal";
import ModerationModal from "@/components/ModerationModal";
import { Link } from "@/i18n/routing";

export default function RateAgentButton({ agent }: { agent: Agent }) {
  const t = useTranslations();
  const { user, isPolicyAcknowledged } = useAuth();
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showRateAgentModal, setShowRateAgentModal] = useState(false);

  useEffect(() => {
    setShowPolicyModal(false);
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

    if (user.isConfirmed && !isPolicyAcknowledged()) {
      setShowPolicyModal(true);
    } else if (user.isConfirmed) {
      setShowRateAgentModal(true);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const handleAcknowledged = () => {
    setShowPolicyModal(false);
    setShowRateAgentModal(true);
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
      <ModerationModal
        show={showPolicyModal}
        closeButton={false}
        onHide={handleAcknowledged}
      />
    </div>
  );
}
