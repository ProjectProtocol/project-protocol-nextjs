import apiClient from './client'

// Create a new user (register)
export async function create({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const result = await apiClient
    .post('/auth/sign_up', { email, password })
    .then((r) => r.data)
    .catch(() => false)

  return result
}

// Delete an existing user
export async function destroy(userPassword: string) {
  const result = await apiClient.delete('/auth', {
    data: { password: userPassword },
  })

  return result
}
