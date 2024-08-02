"use client";

import Input from "../Input";
import { useTranslations } from "next-intl";
import AsyncButton from "../AsyncButton";
import { login, ILoginFormState } from "@/lib/actions/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

export default function LoginForm({ callbackURL }: { callbackURL?: string }) {
  const t = useTranslations();
  const schema = z.object({
    email: z
      .string()
      .min(1, t("login.emailRequired"))
      .email(t("login.emailMessage")),
    password: z
      .string()
      .min(1, t("login.passwordRequired"))
      .min(8, t("shared.passwordLengthError")),
  });
  const { register, handleSubmit, getFieldState, formState } =
    useForm<ILoginFormState>({
      mode: "onBlur",
      defaultValues: {
        loginEmail: "",
        password: "",
        callbackURL,
      },
      resolver: zodResolver(schema),
    });

  async function onSubmit(data: ILoginFormState) {
    await login(data);
  }

  const validationProps = useCallback(
    (fieldName: keyof ILoginFormState) => {
      const { invalid, error } = getFieldState(fieldName, formState);
      return {
        isInvalid: invalid,
        error: error?.message,
      };
    },
    [getFieldState, formState]
  );

  return (
    <div className="d-block p-4">
      <div className="text-center mb-3">{t("login.loginTitleHelper")}</div>
      <form className="vertical-rhythm" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="callbackURL" value={callbackURL} />
        <Input
          size="lg"
          controlId={`login-email`}
          label={t("login.email")}
          type="email"
          placeholder={t("login.emailPlaceholder")}
          {...register("loginEmail")}
          {...validationProps("loginEmail")}
        />
        <Input
          size="lg"
          controlId={"login-password"}
          label={t("login.password")}
          className="mb-2"
          type="password"
          {...register("password")}
          {...validationProps("password")}
        />
        <div>
          <a className="link" href="/login/forgot-password">
            {t("login.forgotPassword")}
          </a>
        </div>
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        >
          {t("login.login")}
        </AsyncButton>
        <div className="text-center">
          {t("login.loginHelper")}
          <a className="link ms-1" href="/login/signup">
            {t("login.signup")}
          </a>
        </div>
      </form>
    </div>
  );
}
