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
import { FormCheck } from "react-bootstrap";

export default function SignupForm() {
  const tShared = useTranslations("shared");
  const tLogin = useTranslations("login");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const schema = z.object({
    signUpEmail: z
      .string()
      .min(1, tLogin("emailRequired"))
      .email(tLogin("emailMessage")),
    password: z
      .string()
      .min(1, tLogin("passwordRequired"))
      .min(8, tShared("passwordLengthError")),
    joinMailingList: z.boolean().optional(),
  });

  const router = useRouter();
  const { register, handleSubmit, getFieldState, formState } =
    useForm<ISignupFormState>({
      mode: "onBlur",
      defaultValues: {
        signUpEmail: "",
        password: "",
        joinMailingList: false,
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
      toast.error(tShared("genericError"));
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
        {tLogin("signupTitleHelper")}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          size="lg"
          controlId={`signup-email`}
          label={tLogin("email")}
          type="email"
          {...register("signUpEmail")}
          {...validationProps("signUpEmail")}
          placeholder={tLogin("emailPlaceholder")}
        />
        <Input
          size="lg"
          controlId={`signup-password`}
          label={tLogin("password")}
          type="password"
          {...register("password")}
          {...validationProps("password")}
        />
        <FormCheck
          type={"checkbox"}
          label={tLogin("joinMailingList")}
          {...register("joinMailingList")}
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
              {tLogin("signup")}
            </AsyncButton>
          }
          <div className="mt-3 text-center">
            {tLogin("signupHelper")}
            <Link className="link ms-1" href="/auth/login" replace>
              {tLogin("login")}
            </Link>
          </div>
        </div>
      </form>
      <div className="mt-5 text-center">
        <Link className="link ms-1" href="/content/terms-of-service" replace>
          {tLogin("readTermsOfService")}
        </Link>
      </div>
    </div>
  );
}
