import { ModalProps } from "react-bootstrap";
import LoginForm from "./LoginForm";
import Image from "next/image";
import defaultIcon from "@/public/images/icon.svg";
import { getTranslations } from "next-intl/server";

interface LoginModal extends ModalProps {
  postLogin?: () => void;
}

export default async function LoginModal({ ...props }: LoginModal) {
  const t = await getTranslations();

  return (
    <div
      style={{ minHeight: "500px" }}
      className="d-flex flex-column justify-content-center px-5"
    >
      <div className="d-flex flex-column justify-content-center">
        <h5>
          <span className="d-flex align-items-start">
            <Image
              alt={t("shared.ppLogoAlt")}
              src={defaultIcon}
              width={20}
              className="me-2"
            />
            {t("login.loginTitle")}
          </span>
        </h5>
        <LoginForm submitLabel={t("login.loginLabel")} />
      </div>
    </div>
  );
}
