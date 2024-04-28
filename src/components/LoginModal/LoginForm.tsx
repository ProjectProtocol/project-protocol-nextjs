import Input from '../Input'
import { kebabCase, uniqueId } from 'lodash-es'
import AsyncButton from '@/src/components/AsyncButton'
import useTranslation from '@/src/lib/util/dummyTranslation'
import { useFormState } from 'react-dom'
import { login } from '@/app/actions/auth'


interface ILoginForm {
  title: string
  submitLabel: string
  onSubmit: () => void
}

export default function LoginForm({
  title,
  submitLabel = 'Submit',
  onSubmit,
}: ILoginForm) {
  const { t } = useTranslation()
  const [state, action] = useFormState(login, undefined)

  const emailErrors = state?.errors?.email?.join('.')
  const passwordErrors = state?.errors?.password?.join('.')

  return (
    <div className="d-block p-4">
      <div className="text-center mb-3">
        {t('account.loginModal.loginTitleHelper')}
      </div>
      <form action={action} className="vertical-rhythm">
        <Input
          size="lg"
          controlId={`${kebabCase(title)}-email`}
          label={t('account.create.email')}
          type="email"
          name="email"
          error={state?.errors?.email?.join('.')}
          isInvalid={!!emailErrors}
          placeholder={t('account.create.emailPlaceholder')}
        />
        <div>
          <Input
            size="lg"
            controlId={`${kebabCase(title)}-password`}
            label={t('account.create.password')}
            error={state?.errors?.password?.join('.')}
            isInvalid={!!passwordErrors}
            className="mb-2"
            type="password"
            name="password"
          />
        </div>
        <AsyncButton
          size="lg"
          className="w-100"
          variant="primary"
          type="submit"
        >
          {submitLabel}
        </AsyncButton>
      </form>
    </div>
  )
}
