import apiClient from './client'

// Confirm an account via token
export async function create({ token }: { token?: string }): Promise<boolean> {
  const result = await apiClient
    .post('/auth/confirmations', { token })
    .then((r) => 400 > r.status && r.status >= 200)
    .catch(() => false)

  return result
}

export async function resend(): Promise<boolean> {
  const result = await apiClient
    .post('/auth/confirmations/resend')
    .then((r) => 400 > r.status && r.status >= 200)
    .catch(() => false)

  return result
}
