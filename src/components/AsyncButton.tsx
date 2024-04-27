import { Button, ButtonProps, Spinner } from 'react-bootstrap'

export interface IAsyncButton extends ButtonProps {
  loading: boolean
}

export default function AsyncButton({
  loading,
  children,
  disabled,
  ...props
}: IAsyncButton) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading ? (
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
