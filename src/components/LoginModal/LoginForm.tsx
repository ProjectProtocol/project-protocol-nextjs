"use client";

import Input from "../Input";
import { kebabCase } from "lodash-es";
import AsyncButton from "@/src/components/AsyncButton";
import useTranslation from "@/src/lib/util/dummyTranslation";
import { useFormState } from "react-dom";
import { login } from "@/app/actions/auth";

interface ILoginForm {
  title: string;
  submitLabel: string;
}

export default function LoginForm({
  title,
  submitLabel = "Submit",
}: ILoginForm) {
  const { t } = useTranslation();
  const [state, action] = useFormState(login, undefined);

  const emailErrors = state?.error?.email?.join(".");
  const passwordErrors = state?.error?.password?.join(".");

  return (
    <div className="d-block">
      <div className="text-center mb-3">
        {t("account.loginModal.loginTitleHelper")}
      </div>
      <form action={action} className="vertical-rhythm">
        <Input
          size="lg"
          controlId={`${kebabCase(title)}-email`}
          label={t("account.create.email")}
          type="email"
          name="email"
          autoComplete="email"
          error={state?.error?.email?.join(".")}
          isInvalid={!!emailErrors}
          placeholder={t("account.create.emailPlaceholder")}
        />
        <div>
          <Input
            size="lg"
            controlId={`${kebabCase(title)}-password`}
            label={t("account.create.password")}
            error={state?.error?.password?.join(".")}
            isInvalid={!!passwordErrors}
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
