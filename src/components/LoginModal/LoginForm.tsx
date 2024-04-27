import Input from '../Input'
import emailRegex from '@/src/util/emailRegex'
import { useEffect } from 'react'
import { kebabCase, uniqueId } from 'lodash-es'
import AsyncButton from '@/src/components/AsyncButton'
import useTranslation from '@/src/lib/util/dummyTranslation'

export interface ILoginFormState {
  email: string
  password: string
}

interface ILoginForm {
  title: string
  submitLabel: string
  onSubmit: () => void
  isActive: boolean
  setPage: (n: number) => void
}

export default function LoginForm({
  title,
  isActive,
  submitLabel = 'Submit',
  onSubmit,
  setPage,
}: ILoginForm) {
  const { t } = useTranslation()

  return (
    <div className="d-block p-4">
      <div className="text-center mb-3">
        {t('account.loginModal.loginTitleHelper')}
      </div>
      <form onSubmit={onSubmit} className="vertical-rhythm">
        <Input
          size="lg"
          controlId={`${kebabCase(title)}-email`}
          label={t('account.create.email')}
          type="email"
          placeholder={t('account.create.emailPlaceholder')}
        />
        <div>
          <Input
            size="lg"
            controlId={`${kebabCase(title)}-password`}
            label={t('account.create.password')}
            className="mb-2"
            type="password"
          />
          <a
            key={uniqueId()}
            className="link"
            role="button"
            onClick={() => {}}
          >
            {t('account.forgotPassword')}
          </a>
        </div>
        <AsyncButton
          loading={false}
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
