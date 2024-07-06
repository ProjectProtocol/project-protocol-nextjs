import classNames from 'classnames'
import Button from 'react-bootstrap/Button'

interface IRatingRadioButton {
  onClick: (v: number) => void
  isActive: boolean
  value: number
}
export default function RatingRadioButton({
  onClick,
  isActive,
  value,
}: IRatingRadioButton) {
  return (
    <Button
      className={classNames('fw-bold p-0', {
        'text-white': isActive && value < 4,
      })}
      variant={isActive ? `rating-${value}` : 'outline-dark'}
      style={{ width: 50, height: 50 }}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  )
}
