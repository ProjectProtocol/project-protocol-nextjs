"use client";

import { useTranslations } from "next-intl";
import PopUp, { IPopUp } from "@/components/PopUp";
import AsyncButton from "@/components/AsyncButton";
import { Button } from "react-bootstrap";
import Input from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";

interface IDeleteAccountModal {
  onHide: () => void;
  handleDelete: SubmitHandler<{ password: string }>;
}

export default function DeleteAccountModal({
  onHide,
  handleDelete,
  ...popUpProps
}: IDeleteAccountModal & IPopUp) {
  const t = useTranslations();
  const schema = z.object({
    password: z
      .string()
      .min(
        1,
        t("shared.requiredField", { field: t("account.delete.password") })
      ),
  });
  const { register, handleSubmit, getFieldState, formState } = useForm<{
    password: string;
  }>({
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const validationProps = useCallback(
    (fieldName: keyof { password: string }) => {
      const { invalid, error } = getFieldState(fieldName, formState);
      return {
        isInvalid: invalid,
        error: error?.message,
      };
    },
    [getFieldState, formState]
  );

  return (
    <PopUp title={t("account.delete.title")} {...popUpProps} onHide={onHide}>
      <form className="vertical-rhythm" onSubmit={handleSubmit(handleDelete)}>
        <p>{t("account.delete.confirmMessage")}</p>
        <p>{t("account.delete.enterPassword")}</p>
        <Input
          type="password"
          label={t("account.delete.password")}
          placeholder={t("account.delete.password")}
          {...validationProps("password")}
          {...register("password")}
        />
        <div className="d-flex flex-row justify-content-between mt-4">
          <Button variant="outline-dark" onClick={onHide}>
            {t("shared.cancel")}
          </Button>
          <AsyncButton type="submit" variant="danger">
            {t("account.delete.submit")}
          </AsyncButton>
        </div>
      </form>
    </PopUp>
  );
}
