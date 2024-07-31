"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Input from "@/components/Input";
import { useCallback } from "react";
import AsyncButton from "@/components/AsyncButton";
import { IPasswordResetsFormState, resetPassword } from "@/lib/actions/account";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PasswordResetForm({ token }: { token: string }) {
  const t = useTranslations();
  const router = useRouter();
  const { register, watch, handleSubmit, getFieldState, formState } =
    useForm<IPasswordResetsFormState>({
      mode: "onBlur",
      defaultValues: {
        newPassword: "",
        newPasswordConfirm: "",
        token,
      },
    });

  async function onSubmit(data: IPasswordResetsFormState) {
    const { error } = await resetPassword(data);

    if (error) {
      toast.error(t(error));
    } else {
      toast.success(t("password_reset.resetSuccess"));
      router.replace("/");
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
    <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
      <Input
        label={t("account.changePassword.newPassword")}
        type="password"
        {...validationProps("newPassword")}
        {...register("newPassword", {
          required: t("shared.requiredField", {
            field: t("password_reset.newPassword.title"),
          }),
          minLength: {
            value: 8,
            message: t("shared.passwordLengthError"),
          },
        })}
      />
      <Input
        label={t("account.changePassword.newPasswordConfirm")}
        type="password"
        {...validationProps("newPasswordConfirm")}
        {...register("newPasswordConfirm", {
          required: t("shared.requiredField", {
            field: t("account.changePassword.newPasswordConfirm"),
          }),
          validate: (value) =>
            value === watch("newPassword") ||
            t("password_reset.newPasswordConfirmMismatch"),
        })}
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
  );
}