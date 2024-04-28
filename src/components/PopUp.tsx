import { Modal, ModalProps } from 'react-bootstrap'
import defaultIcon from '@/public/images/icon.svg'
import Image from 'next/image'
import useTranslation from '../lib/util/dummyTranslation'

export interface IPopUp extends ModalProps {
  title?: string
  titleHelper?: string
  icon?: string
  bodyClass?: string
}

export default function PopUp({
  bodyClass,
  children,
  title,
  titleHelper,
  icon,
  closeButton,
  ...props
}: IPopUp) {
  const { t } = useTranslation()

  const imageSrc = (icon || defaultIcon)
  return (
    <Modal centered {...props}>
      <Modal.Header closeButton={closeButton} />
      <Modal.Body className={bodyClass}>
        {title && (
          <div className="mb-3">
            <h3>
              <Image
                src={imageSrc}
                alt={t('ui.ppLogoAlt')}
                className="me-2"
                style={{ width: "auto",height: '1.125rem' }}
              />
              {title}
            </h3>
            {titleHelper && <p className="small">{titleHelper}</p>}
          </div>
        )}
        {children}
      </Modal.Body>
    </Modal>
  )
}
