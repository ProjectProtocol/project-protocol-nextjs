"use client";

import Input from "@/components/Input";
import { useTranslations } from "next-intl";
import AsyncButton from "@/components/AsyncButton";
import { requestPasswordReset } from "@/lib/actions/account";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useOriginalPath } from "@/components/OriginalPathProvider";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";

export interface IRequestPasswordResetFormState {
  email: string;
}
export default function ForgotPasswordForm() {
  const tPasswordReset = useTranslations("password_reset");
  const tLogin = useTranslations("login");
  const tShared = useTranslations("shared");
  const { getOriginalPath } = useOriginalPath();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().email(tLogin("emailMessage")),
  });
  const { register, handleSubmit, getFieldState, formState } =
    useForm<IRequestPasswordResetFormState>({
      mode: "onBlur",
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(schema),
    });

  async function onSubmit(formData: IRequestPasswordResetFormState) {
    const originalPath = getOriginalPath();
    setIsLoading(true);
    const { data } = await requestPasswordReset({
      ...formData,
      originalPath,
    });
    if (data?.success) {
      toast.success(tPasswordReset("resetRequestSuccess"));
      router.replace(originalPath);
    } else {
      toast.error(tShared("genericError"));
      setIsLoading(false);
    }
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
        {tLogin("forgotPasswordTitleHelper")}
      </div>
      <form className="vertical-rhythm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label={tLogin("email")}
          placeholder={tLogin("emailPlaceholder")}
          {...validationProps("email")}
          {...register("email")}
        />
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
          disabled={!formState.isValid}
          loading={isLoading}
        >
          {tLogin("resetPassword.submit")}
        </AsyncButton>
        <div>
          {tLogin("loginHelper")}
          <Link className="link ms-1" href="/auth/signup" replace>
            {tLogin("signup")}
          </Link>
        </div>
      </form>
    </div>
  );
}
