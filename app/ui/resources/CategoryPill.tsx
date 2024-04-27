import classNames from 'classnames'
import Badge from 'react-bootstrap/Badge'

interface ICategoryPill {
  active: boolean
  label: string
  onClick?: () => void
}

export default function CategoryPill({
  active,
  label,
  onClick,
}: ICategoryPill) {
  return (
    <Badge
      pill
      onClick={onClick}
      role="button"
      className={classNames('text-decoration-none border border-dark ', {
        'bg-white text-dark': !active,
        'bg-dark text-white': active,
      })}
    >
      {label}
    </Badge>
  )
}
