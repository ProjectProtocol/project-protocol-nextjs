import { Button, ModalProps } from 'react-bootstrap'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { ApiPasswordResets, ApiSession, ApiUsers } from 'src/api'
import toast from 'react-hot-toast'
import logo from 'src/images/icon.svg'
import { useTranslation } from 'react-i18next'
import PopUp from '../PopUp'
import { LOGIN_PAGES } from './constants'
import LoginForm, { ILoginFormState } from './LoginForm'
import SignupForm, { ISignupFormState } from './SignupForm'
import ConfirmSignup from './ConfirmSignup'
import { useNavigate } from 'react-router-dom'

interface LoginModal extends ModalProps {
  page: number
  setPage: (p: number) => void
  postLogin: () => void
}

export default function LoginModal({
  page,
  setPage,
  postLogin,
  ...props
}: LoginModal) {
  const { user, setUser } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const logIn = async ({ email, password }: ILoginFormState) => {
    const { user } = await ApiSession.create(email, password)
    if (user) {
      setUser(user)
      toast.success(t('account.login.success'))
      postLogin()
    } else {
      toast.error(t('error.generic'))
    }
  }

  const signUp = async (data: ISignupFormState) => {
    const { user } = await ApiUsers.create(data)
    if (user) {
      setUser(user)
    } else {
      toast.error(t('error.generic'))
    }
  }

  const passwordReset = async ({ email }: IForgotPasswordFormState) => {
    const result = await ApiPasswordResets.create({ email })
    if (result) {
      toast.success(
        (t) => (
          <span>
            {result?.message}
            <Button
              size="sm"
              variant="link"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </Button>
          </span>
        ),
        {
          duration: Infinity,
        },
      )
    } else {
      toast.error(t('error.generic'))
    }

    props.onHide && props.onHide()
  }

  const PAGE_TITLES = [
    {
      title: t('account.loginModal.loginTitle'),
    },
    {
      title: t('account.loginModal.signupTitle'),
    },
    {
      title: t('account.loginModal.forgotPasswordTitle'),
    },
    {
      title: t('account.loginModal.confirmSignupTitle'),
    },
  ]

  const titleProps = PAGE_TITLES[page]

  return (
    <PopUp {...props} closeButton style={props.show ? {} : { zIndex: 0 }}>
      <div
        style={{ maxWidth: '300px', margin: '0 auto', minHeight: '500px' }}
        className="d-flex flex-column justify-content-center"
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          {page == LOGIN_PAGES.SIGN_IN ||
          page == LOGIN_PAGES.FORGOT_PASSWORD ? (
            <h5>
              <span className="d-flex align-items-start">
                <img src={logo} width="20" className="me-2" />
                {titleProps.title}
              </span>
            </h5>
          ) : (
            <>
              <img src={logo} width="50" className="mb-4" />
              <h3 className="text-center">{titleProps.title}</h3>
            </>
          )}
        </div>
        {page === LOGIN_PAGES.SIGN_IN && (
          <LoginForm
            isActive={page === LOGIN_PAGES.SIGN_IN}
            title={t('account.login.login')}
            submitLabel={t('account.login.loginLabel')}
            onSubmit={logIn}
            setPage={setPage}
          />
        )}
        {page === LOGIN_PAGES.SIGN_UP && (
          <SignupForm
            isActive={page === LOGIN_PAGES.SIGN_UP}
            title={t('account.login.signup')}
            submitLabel={t('account.login.signupLabel')}
            onSubmit={signUp}
            setPage={setPage}
          />
        )}
        {page === LOGIN_PAGES.FORGOT_PASSWORD && (
          <ForgotPasswordForm onSubmit={passwordReset} setPage={setPage} />
        )}
        {page === LOGIN_PAGES.CONFIRM_SIGNUP && user && (
          <ConfirmSignup email={user.email} />
        )}
      </div>
      <div className="mt-5 text-center">
        <a
          role="button"
          onClick={() => {
            navigate('/terms-of-service')
            if (props.onHide) props.onHide()
          }}
          className="link"
        >
          Read our terms of service
        </a>
      </div>
    </PopUp>
  )
}
