"use client";

import { useTranslations } from "next-intl";
import PopUp, { IPopUp } from "@/components/PopUp";
import {
  changePassword,
  IChangePasswordFormState,
} from "@/lib/actions/account";
import Input from "@/components/Input";
import AsyncButton from "@/components/AsyncButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useCallback } from "react";

interface IChangePasswordModal {
  onHide: () => void;
  closeButton?: boolean;
}

export default function ChangePasswordModal({
  onHide,
  closeButton,
  ...popUpProps
}: IChangePasswordModal & IPopUp) {
  const t = useTranslations();
  const schema = z
    .object({
      password: z.string(),
      newPassword: z.string().min(8, t("account.changePassword.detail")),
      newPasswordConfirm: z.string().min(8, t("account.changePassword.detail")),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
      message: t("password_reset.newPasswordConfirmMismatch"),
      path: ["newPasswordConfirm"],
    });
  const { register, handleSubmit, getFieldState, formState } =
    useForm<IChangePasswordFormState>({
      mode: "onBlur",
      defaultValues: {
        password: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
      resolver: zodResolver(schema),
    });

  async function onSubmit(data: IChangePasswordFormState) {
    const { error } = await changePassword(data);
    if (error) {
      toast.error(t(error));
    } else {
      toast.success(t("account.changePassword.success.heading"));
      onHide();
    }
  }

  const validationProps = useCallback(
    (fieldName: keyof IChangePasswordFormState) => {
      const { invalid, error } = getFieldState(fieldName, formState);
      return {
        isInvalid: invalid,
        error: error?.message,
      };
    },
    [getFieldState, formState]
  );

  return (
    <PopUp
      title={t("account.changePassword.title")}
      {...popUpProps}
      closeButton
      onHide={onHide}
    >
      <form className="vertical-rhythm" onSubmit={handleSubmit(onSubmit)}>
        <p>{t("account.changePassword.intro")}</p>
        <Input
          type="password"
          label={t("account.changePassword.currentPassword")}
          placeholder={t("account.changePassword.currentPassword")}
          {...validationProps("password")}
          {...register("password")}
        />
        <hr />
        <p>{t("password_reset.modal.intro")}</p>
        <Input
          type="password"
          label={t("account.changePassword.newPassword")}
          placeholder={t("account.changePassword.newPassword")}
          {...validationProps("newPassword")}
          {...register("newPassword")}
        />
        <Input
          type="password"
          label={t("account.changePassword.newPasswordConfirm")}
          placeholder={t("account.changePassword.newPasswordConfirm")}
          {...validationProps("newPasswordConfirm")}
          {...register("newPasswordConfirm")}
        />
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        >
          {t("account.changePassword.action")}
        </AsyncButton>
      </form>
    </PopUp>
  );
}
