"use client";

import Input from "@/components/Input";
import { useTranslations } from "next-intl";
import AsyncButton from "@/components/AsyncButton";
import { login, ILoginFormState } from "@/lib/actions/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useOriginalPath } from "@/components/OriginalPathProvider";
import toast from "react-hot-toast";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const t = useTranslations();
  const { getOriginalPath } = useOriginalPath();
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    loginEmail: z
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
      },
      resolver: zodResolver(schema),
    });

  async function onSubmit(data: ILoginFormState) {
    setIsLoading(true);
    const redirectTo = getOriginalPath();
    const err = await login(data, redirectTo);

    if (err) {
      toast.error(t("login.loginFieldsError"));
      setIsLoading(false);
    } else {
      toast.success(t("login.success"));
    }
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
          <Link href="/auth/forgot-password">{t("login.forgotPassword")}</Link>
        </div>
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
          disabled={!formState.isValid}
          loading={isLoading}
        >
          {t("login.login")}
        </AsyncButton>
        <div className="text-center">
          {t("login.loginHelper")}
          <Link className="link ms-1" href="/auth/signup">
            {t("login.signup")}
          </Link>
        </div>
      </form>
    </div>
  );
}
