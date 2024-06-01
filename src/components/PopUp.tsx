"use client";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import defaultIcon from "@/public/images/icon.svg";
import Image from "next/image";
import useTranslation from "../lib/util/dummyTranslation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface IPopUp extends ModalProps {
  title?: string;
  titleHelper?: string;
  icon?: string;
  bodyClass?: string;
}

// This is a great pattern for easy dynamic modals that support server component children in nextjs
export default function PopUp({
  bodyClass,
  children,
  title,
  titleHelper,
  icon,
  closeButton,
  ...props
}: IPopUp) {
  const { t } = useTranslation();
  const router = useRouter();

  const imageSrc = icon || defaultIcon;

  return (
    <Modal centered {...props} show={true} onHide={router.back}>
      <ModalHeader closeButton={closeButton} />
      <ModalBody className={bodyClass}>
        {title && (
          <div className="mb-3">
            <h3>
              <Image
                src={imageSrc}
                alt={t("ui.ppLogoAlt")}
                className="me-2"
                style={{ width: "auto", height: "1.125rem" }}
              />
              {title}
            </h3>
            {titleHelper && <p className="small">{titleHelper}</p>}
          </div>
        )}
        {children}
      </ModalBody>
    </Modal>
  );
}
