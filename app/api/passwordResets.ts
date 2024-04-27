import apiClient from './client'

export async function get(token: string) {
  const result = await apiClient
    .get(`/auth/password_resets/${token}`)
    .then((r) => r.status === 200)
    .catch(() => false)

  return result
}

export async function create({ email }: { email: string }) {
  const result = await apiClient
    .post('/auth/password_resets', { email })
    .then((r) => r.data)
    .catch(() => false)

  return result
}

interface IApiPasswordResetsUpdateArgs {
  newPassword: string
  newPasswordConfirm: string
  token: string
}
export async function update({
  newPassword,
  newPasswordConfirm,
  token,
}: IApiPasswordResetsUpdateArgs) {
  const result = await apiClient
    .patch(`/auth/password_resets/${token}`, {
      newPassword,
      newPasswordConfirm,
    })
    .then((r) => r.data)
    .catch(() => false)

  return result
}
