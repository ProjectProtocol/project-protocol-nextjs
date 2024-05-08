"use client";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import defaultIcon from "@/public/images/icon.svg";
import Image from "next/image";
import useTranslation from "../lib/util/dummyTranslation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface IPopUp extends ModalProps {
  title?: string;
  titleHelper?: string;
  icon?: string;
  bodyClass?: string;
  modalKey: string;
}

// This is a great pattern for easy dynamic modals that support server component children in nextjs
export default function PopUp({
  bodyClass,
  children,
  title,
  titleHelper,
  icon,
  closeButton,
  modalKey,
  ...props
}: IPopUp) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = searchParams.get(modalKey) !== null;
  const imageSrc = icon || defaultIcon;

  function hideModal() {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete(modalKey);
    router.replace(`${pathname}?${nextSearchParams}`);
  }

  return (
    <Modal centered {...props} show={show} onHide={hideModal}>
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
