"use client";

import Button, { ButtonProps } from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormState, useFormStatus } from "react-dom";

export interface IAsyncButton extends ButtonProps {
  children: React.ReactNode;
}

export default function AsyncButton({
  children,
  disabled,
  ...props
}: IAsyncButton) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending || disabled} {...props}>
      {pending ? (
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
