'use client'

import { Button, ButtonProps, Spinner } from 'react-bootstrap'
import { useFormStatus } from 'react-dom'

export interface IAsyncButton extends ButtonProps {}

export default function AsyncButton({
  children,
  disabled,
  ...props
}: IAsyncButton) {
  const { pending } = useFormStatus()
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
  )
}
