import {  ModalProps } from 'react-bootstrap'
import PopUp from '../PopUp'
import useTranslation from '@/src/lib/util/dummyTranslation'
import LoginForm from './LoginForm'

interface LoginModal extends ModalProps {
  postLogin?: () => void
}

export default function LoginModal({
  ...props
}: LoginModal) {
  const { t } = useTranslation()
  const logIn = async ({ email, password }: { email: string, password: string }) => {
    console.log(email, password)  
  }

  return (
    <PopUp {...props} title={t('account.loginModal.loginTitle')} closeButton style={props.show ? {} : { zIndex: 0 }}>
      <div
        style={{ maxWidth: '300px', margin: '0 auto', minHeight: '500px' }}
        className="d-flex flex-column justify-content-center"
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          <LoginForm
            title={t('account.login.login')}
            submitLabel={t('account.login.loginLabel')}
          />
      </div>
     </div>
    </PopUp>
  )
}
