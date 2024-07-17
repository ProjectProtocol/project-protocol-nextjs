"use client";

interface IDeleteAccountModal {
  onHide: () => void;
  closeButton?: boolean;
}

export default function DeleteAccountModal({
  onHide,
  closeButton,
}: IDeleteAccountModal) {
  return (
    <PopUp
      title={t("account.delete.title")}
      {...popUpProps}
      closeButton
      onHide={onHide}
    >
      <p>{t("account.delete.intro")}</p>
      <AsyncButton
        type="danger"
        action={deleteAccount}
        onSuccess={onHide}
        label={t("account.delete.action")}
      />
    </PopUp>
  );
}
