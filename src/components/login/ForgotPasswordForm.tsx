"use client";
import Input from "../Input";
import { useTranslations } from "next-intl";
import AsyncButton from "../AsyncButton";
import {
  IRequestPasswordResetFormState,
  requestPasswordReset,
} from "@/lib/actions/account";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

export default function ForgotPasswordForm() {
  const t = useTranslations();
  const schema = z.object({
    email: z.string().email(t("login.emailMessage")),
  });
  const { register, handleSubmit, getFieldState, formState } =
    useForm<IRequestPasswordResetFormState>({
      mode: "onBlur",
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(schema),
    });

  async function onSubmit(data: IRequestPasswordResetFormState) {
    await requestPasswordReset(data);
  }

  const validationProps = useCallback(
    (fieldName: keyof IRequestPasswordResetFormState) => {
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
      <div className="text-center mb-3">
        {t("login.forgotPasswordTitleHelper")}
      </div>
      <form className="vertical-rhythm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label={t("login.email")}
          placeholder={t("login.emailPlaceholder")}
          {...validationProps("email")}
          {...register("email")}
        />
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        >
          {t("login.resetPassword.submit")}
        </AsyncButton>
        <div>
          {t("login.loginHelper")}
          <a className="link ms-1" href="/login/signup">
            {t("login.signup")}
          </a>
        </div>
      </form>
    </div>
  );
}
