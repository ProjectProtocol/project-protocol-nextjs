import Card from "react-bootstrap/Card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

interface IAddAgentCard {
  signedIn?: boolean;
}

export default function AddAgentCard({ signedIn }: IAddAgentCard) {
  const t = useTranslations();
  const { user } = useAuth();
  return (
    <Card border="0" className="mb-3">
      <Card.Body className="p-4 text-center vertical-rhythm">
        <h3>{t("rate_my_po.noResults", { ns: "rate_my_po" })}</h3>
        {user ? (
          <Link
            href="/rate-my-po/new"
            aria-label={t("agent.addAgent")}
            className="w-75 btn btn-lg btn-primary"
          >
            {t("agent.addAgent")}
          </Link>
        ) : (
          <>
            <Link
              href="/auth/sign-up"
              aria-label={t("agent.signUpToAddAgent")}
              className="btn btn-lg btn-primary w-75 mb-3"
            >
              {t("agent.signUpToAddAgent")}
            </Link>
            <Link href="/auth/login" className="d-block">
              {t("shared.orLogIn")}
            </Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
