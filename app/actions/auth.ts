'use server'

import { LoginFormSchema } from '@/src/lib/definitions'
import { z } from 'zod'

export async function login(prevState: any, formData: FormData) {
  console.log(formData.get('email'))
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),

  })

  if (!validatedFields.success) {
    console.log(validatedFields)
    console.log(validatedFields.error?.flatten().fieldErrors)
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
    }
  }

  console.log("hi", validatedFields.data)

}