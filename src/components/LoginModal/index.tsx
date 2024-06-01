import { ModalProps } from "react-bootstrap";
import useTranslation from "@/src/lib/util/dummyTranslation";
import LoginForm from "./LoginForm";
import Image from "next/image";
import defaultIcon from "@/public/images/icon.svg";

interface LoginModal extends ModalProps {
  postLogin?: () => void;
}

export default async function LoginModal({ ...props }: LoginModal) {
  const { t } = useTranslation();

  return (
    <div
      style={{ minHeight: "500px" }}
      className="d-flex flex-column justify-content-center px-5"
    >
      <div className="d-flex flex-column justify-content-center">
        <h5>
          <span className="d-flex align-items-start">
            <Image
              alt="Project Protocol Logo"
              src={defaultIcon}
              width={20}
              className="me-2"
            />
            {t("account.loginModal.loginTitle")}
          </span>
        </h5>
        <LoginForm submitLabel={t("account.login.loginLabel")} />
      </div>
    </div>
  );
}
