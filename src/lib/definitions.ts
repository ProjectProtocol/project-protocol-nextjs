import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .trim(),
});

export type AuthFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      pathname: string;
    }
  | undefined;
