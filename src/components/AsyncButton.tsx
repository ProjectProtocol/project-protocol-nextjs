"use client";

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
      {isLoading ? (
        <>
          <Spinner
            size="sm"
            role="status"
            className="align-middle"
            animation="border"
            variant="black"
          />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
