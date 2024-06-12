import { z } from 'zod';

const bikeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Bike name is required',
        invalid_type_error: 'Bike name must be a string',
      })
      .trim(),

    description: z
      .string({
        required_error: 'Bike description is required',
        invalid_type_error: 'Bike description must be a string',
      })
      .trim(),
    pricePerHour: z
      .number({
        required_error: 'Price per hour is required',
        invalid_type_error: 'Price per hour must be a number',
      })
      .min(1, { message: 'Price per hour must be at least 1 digits' }),
    cc: z
      .number({
        required_error: 'Bike CC is required',
        invalid_type_error: 'Bike CC must be a number',
      })
      .min(2, { message: 'Bike CC must be at least 2 digits' }),
    year: z
      .number({
        required_error: 'Bike manufacturing year is required',
        invalid_type_error: 'Bike manufacturing year must be a number',
      })
      .min(4, { message: 'Bike manufacturing year must be at least 4 digits' }),
    model: z
      .string({
        required_error: 'Bike model is required',
        invalid_type_error: 'Bike model must be a string',
      })
      .trim(),
    brand: z
      .string({
        required_error: 'Bike brand is required',
        invalid_type_error: 'Bike brand must be a string',
      })
      .trim(),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Bike name is required',
        invalid_type_error: 'Bike name must be a string',
      })
      .trim()
      .optional(),

    description: z
      .string({
        required_error: 'Bike description is required',
        invalid_type_error: 'Bike description must be a string',
      })
      .trim()
      .optional(),
    pricePerHour: z
      .number({
        required_error: 'Price per hour is required',
        invalid_type_error: 'Price per hour must be a number',
      })
      .min(1, { message: 'Price per hour must be at least 1 digits' })
      .optional(),
    cc: z
      .number({
        required_error: 'Bike CC is required',
        invalid_type_error: 'Bike CC must be a number',
      })
      .min(2, { message: 'Bike CC must be at least 2 digits' })
      .optional(),
    year: z
      .number({
        required_error: 'Bike manufacturing year is required',
        invalid_type_error: 'Bike manufacturing year must be a number',
      })
      .min(4, { message: 'Bike manufacturing year must be at least 4 digits' })
      .optional(),
    model: z
      .string({
        required_error: 'Bike model is required',
        invalid_type_error: 'Bike model must be a string',
      })
      .trim()
      .optional(),
    brand: z
      .string({
        required_error: 'Bike brand is required',
        invalid_type_error: 'Bike brand must be a string',
      })
      .trim()
      .optional(),
  }),
});

export const bikeValidations = {
  bikeValidationSchema,
  updateBikeValidationSchema,
};
