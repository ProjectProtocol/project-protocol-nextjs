"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Input from "@/components/Input";
import { useCallback } from "react";
import AsyncButton from "@/components/AsyncButton";
import { IPasswordResetsFormState, resetPassword } from "@/lib/actions/account";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/routing";

export default function PasswordResetForm({ token }: { token: string }) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("original_location") || "";
  const schema = z
    .object({
      newPassword: z
        .string()
        .min(1, t("password_reset.newPassword.required"))
        .min(8, t("shared.passwordLengthError")),
      newPasswordConfirm: z
        .string()
        .min(1, t("password_reset.newPasswordConfirm.required"))
        .min(8, t("shared.passwordLengthError")),
      token: z.string(),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
      message: t("password_reset.newPasswordConfirmMismatch"),
      path: ["newPasswordConfirm"],
    });

  const { register, handleSubmit, getFieldState, formState } =
    useForm<IPasswordResetsFormState>({
      mode: "onBlur",
      defaultValues: {
        newPassword: "",
        newPasswordConfirm: "",
        token,
      },
      resolver: zodResolver(schema),
    });

  async function onSubmit(data: IPasswordResetsFormState) {
    const { error } = await resetPassword(data);

    if (error) {
      toast.error(t(error));
    } else {
      toast.success(t("password_reset.resetSuccess"));
      router.replace(redirectPath);
    }
  }

  const validationProps = useCallback(
    (fieldName: keyof IPasswordResetsFormState) => {
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
      <div className="text-center mb-3">{t("password_reset.modal.intro")}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <input type="hidden" name="token" value={token} />
        <Input
          label={t("account.changePassword.newPassword")}
          type="password"
          {...validationProps("newPassword")}
          {...register("newPassword")}
        />
        <Input
          label={t("account.changePassword.newPasswordConfirm")}
          type="password"
          {...validationProps("newPasswordConfirm")}
          {...register("newPasswordConfirm")}
        />
        <div className="d-flex">
          <AsyncButton
            type="submit"
            className="w-100 btn-lg"
            disabled={!formState.isValid}
            loading={formState.isSubmitting}
          >
            {t("password_reset.submit")}
          </AsyncButton>
        </div>
      </form>
    </div>
  );
}
