"use client";

import { ISignupFormState } from "@/lib/actions/auth";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/actions/auth";
import { useCallback, useState } from "react";
import Input from "../../../../../components/Input";
import AsyncButton from "../../../../../components/AsyncButton";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import toast from "react-hot-toast";
import { useAuth } from "@/components/AuthProvider";

export default function SignupForm() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const schema = z.object({
    signUpEmail: z
      .string()
      .min(1, t("login.emailRequired"))
      .email(t("login.emailMessage")),
    password: z
      .string()
      .min(1, t("login.passwordRequired"))
      .min(8, t("shared.passwordLengthError")),
  });
  const router = useRouter();
  const { register, handleSubmit, getFieldState, formState } =
    useForm<ISignupFormState>({
      mode: "onBlur",
      defaultValues: {
        signUpEmail: "",
        password: "",
      },
      resolver: zodResolver(schema),
    });

  async function onSubmit(formData: ISignupFormState) {
    setLoading(true);
    const { data, error } = await signUp(formData);
    if (!error) {
      setUser(data);
      router.replace(`/auth/confirmations`);
    } else {
      setLoading(false);
      toast.error(t("shared.genericError"));
    }
  }

  const validationProps = useCallback(
    (fieldName: keyof ISignupFormState) => {
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
      <div className="text-center text-wrap mb-3">
        {t("login.signupTitleHelper")}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          size="lg"
          controlId={`signup-email`}
          label={t("login.email")}
          type="email"
          {...register("signUpEmail")}
          {...validationProps("signUpEmail")}
          placeholder={t("login.emailPlaceholder")}
        />
        <Input
          size="lg"
          controlId={`signup-password`}
          label={t("login.password")}
          type="password"
          {...register("password")}
          {...validationProps("password")}
        />
        <div>
          {
            <AsyncButton
              loading={loading}
              size="lg"
              className="w-100"
              variant="primary"
              type="submit"
            >
              {t("login.signup")}
            </AsyncButton>
          }
          <div className="mt-3 text-center">
            {t("login.signupHelper")}
            <Link className="link ms-1" href="/auth/login" replace>
              {t("login.login")}
            </Link>
          </div>
        </div>
      </form>
      <div className="mt-5 text-center">
        <Link
          className="link ms-1"
          href="/content/en-US/terms-of-service"
          replace
        >
          {t("login.readTermsOfService")}
        </Link>
      </div>
    </div>
  );
}
