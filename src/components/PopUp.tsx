import { useTranslations } from "next-intl";
import Image from "next/image";
import { Modal, ModalProps } from "react-bootstrap";
import defaultIcon from "@/../public/images/icon.svg";

export interface IPopUp extends ModalProps {
  title?: string;
  titleHelper?: string;
  icon?: string;
  bodyClass?: string;
}

export default function PopUp({
  bodyClass,
  children,
  title,
  titleHelper,
  icon,
  closeButton,
  ...props
}: IPopUp) {
  const t = useTranslations();

  return (
    <Modal centered {...props}>
      <Modal.Header closeButton={closeButton} />
      <Modal.Body className={bodyClass}>
        {title && (
          <div className="mb-3">
            <h3>
              <Image
                src={(icon || defaultIcon).src}
                alt={t("shared.ppLogoAlt")}
                width="0"
                height="0"
                className="me-2"
                style={{ height: "1.125rem", width: "auto" }}
              />
              {title}
            </h3>
            {titleHelper && <p className="small">{titleHelper}</p>}
          </div>
        )}
        {children}
      </Modal.Body>
    </Modal>
  );
}
