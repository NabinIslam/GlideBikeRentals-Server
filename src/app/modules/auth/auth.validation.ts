import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Email must be a valid email address' })
      .toLowerCase()
      .trim(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .trim()
      .min(6, { message: 'Password must be at least 6 character' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required.',
      invalid_type_error: 'Refresh token must be a string.',
    }),
  }),
});

export const authValidations = {
  loginValidationSchema,
  refreshTokenValidationSchema,
};
