"use client";
import Input from "../Input";
import AsyncButton from "@/src/components/AsyncButton";
import useTranslation from "@/src/lib/util/dummyTranslation";
import { handleLogin } from "@/app/actions/actions";
import { useFormState } from "react-dom";
import { usePathname } from "next/navigation";

interface ILoginForm {
  submitLabel: string;
}

export default function LoginForm({ submitLabel = "Submit" }: ILoginForm) {
  const pathname = usePathname();
  const [state, formAction] = useFormState(handleLogin, {
    message: pathname,
  });
  const { t } = useTranslation();

  return (
    <div className="d-block">
      <div className="mb-3">{t("account.loginModal.loginTitleHelper")}</div>
      <form action={formAction} className="vertical-rhythm w-100">
        <Input
          size="lg"
          controlId={`login-email`}
          label={t("account.create.email")}
          error={state?.errors?.email?.join(", ")}
          isInvalid={!!state?.errors?.email}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={t("account.create.emailPlaceholder")}
        />
        <div>
          <Input
            size="lg"
            controlId={"login-password"}
            label={t("account.create.password")}
            error={state?.errors?.password?.join(", ")}
            isInvalid={!!state?.errors?.password}
            autoComplete="current-password"
            className="mb-2"
            type="password"
            name="password"
          />
        </div>

        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
        >
          {submitLabel}
        </AsyncButton>
      </form>
    </div>
  );
}
