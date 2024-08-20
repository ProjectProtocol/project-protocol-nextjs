"use client";

import ModerationModal from "@/components/ModerationModal";
import { useState } from "react";

export default function AcknowledgePolicyModal({
  isPolicyAcknowledged,
}: {
  isPolicyAcknowledged: boolean;
}) {
  const [isAcknowledged, setAcknowledged] = useState(isPolicyAcknowledged);
  return (
    <ModerationModal
      show={!isAcknowledged}
      closeButton={false}
      onHide={() => setAcknowledged(true)}
    />
  );
}
