import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .trim(),

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
    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .trim()
      .min(11, { message: 'Phone number must be at least 11 digits' }),
    address: z
      .string({
        required_error: 'address is required',
        invalid_type_error: 'address must be a string',
      })
      .trim(),
    role: z.nativeEnum(USER_ROLE).default(USER_ROLE.user),
  }),
});

export const userValidations = {
  userValidationSchema,
};
