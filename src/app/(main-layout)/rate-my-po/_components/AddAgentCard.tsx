import Card from "react-bootstrap/Card";
import User from "@/types/User";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface IAddAgentCard {
  user?: User;
}

export default function AddAgentCard({ user }: IAddAgentCard) {
  const t = useTranslations();

  return (
    <Card border="0" className="mb-3">
      <Card.Body className="p-4 text-center vertical-rhythm">
        <h3>{t("rate_my_po.noResults", { ns: "rate_my_po" })}</h3>
        {user ? (
          <Link
            href="/agents/new"
            aria-label={t("agent.addAgent")}
            className="w-75 btn btn-lg btn-primary"
          >
            {t("agent.addAgent")}
          </Link>
        ) : (
          <>
            <Link
              href="/login/sign-up"
              aria-label={t("agent.signUpToAddAgent")}
              className="btn btn-lg btn-primary w-75 mb-3"
            >
              {t("agent.signUpToAddAgent")}
            </Link>
            <Link href="/login" className="d-block">
              {t("shared.orLogIn")}
            </Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
