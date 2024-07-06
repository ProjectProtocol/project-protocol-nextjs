"use client";

import { Button } from "react-bootstrap";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import Agent from "@/types/Agent";
import toast from "react-hot-toast";

export default function RateAgentButton({ agent }: { agent: Agent }) {
  const t = useTranslations();
  const { user } = useAuth();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
      toast.success("TODO: Show rating modal");
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
        <Button href="/login/signup" className="w-100">
          {t("agent.signUp")}
        </Button>
      )}

      {!user && (
        <div className="text-center">
          <Button variant="link" href="/login">
            {t("agent.logIn")}
          </Button>
        </div>
      )}
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        user={user}
      />
    </div>
  );
}
