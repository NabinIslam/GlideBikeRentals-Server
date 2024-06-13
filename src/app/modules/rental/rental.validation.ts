import { z } from 'zod';

const createRentalValidationSchema = z.object({
  body: z.object({
    bikeId: z
      .string({
        required_error: 'Bike id is required',
        invalid_type_error: 'Bike id must be a string',
      })
      .trim(),
    startTime: z.string().datetime(),
  }),
});

export const rentalValidations = {
  createRentalValidationSchema,
};
