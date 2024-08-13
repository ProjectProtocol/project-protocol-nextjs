"use client";

import classNames from "classnames";
import Button, { ButtonProps } from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormStatus } from "react-dom";

export interface IAsyncButton extends ButtonProps {
  loading?: boolean;
}

export default function AsyncButton({
  loading,
  children,
  disabled,
  ...props
}: IAsyncButton) {
  const { pending } = useFormStatus();
  const isLoading = loading || pending;

  return (
    <Button disabled={isLoading || disabled} {...props}>
      <div className="position-relative w-100 h-100 d-flex justify-content-center align-items-center">
        <Spinner
          size="sm"
          role="status"
          animation="border"
          className={classNames("position-absolute", {
            "opacity-0": !isLoading,
          })}
        />
        <div className={classNames({ "opacity-0": isLoading })}>{children}</div>
      </div>
    </Button>
  );
}
