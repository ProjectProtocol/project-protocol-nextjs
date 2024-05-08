import { ModalProps } from "react-bootstrap";
import PopUp from "../PopUp";
import useTranslation from "@/src/lib/util/dummyTranslation";
import LoginForm from "./LoginForm";
import Image from "next/image";
import defaultIcon from "@/public/images/icon.svg";

interface LoginModal extends ModalProps {
  postLogin?: () => void;
}

export default function LoginModal({ ...props }: LoginModal) {
  const { t } = useTranslation();

  return (
    <PopUp {...props} closeButton style={props.show ? {} : { zIndex: 0 }}>
      <div
        style={{ maxWidth: "300px", margin: "0 auto", minHeight: "500px" }}
        className="d-flex flex-column justify-content-center"
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
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
          <LoginForm
            title={t("account.login.login")}
            submitLabel={t("account.login.loginLabel")}
          />
        </div>
      </div>
    </PopUp>
  );
}
