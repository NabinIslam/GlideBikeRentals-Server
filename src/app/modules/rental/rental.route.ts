import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { rentalValidations } from './rental.validation';
import { rentalControllers } from './rental.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(rentalValidations.createRentalValidationSchema),
  rentalControllers.createRental,
);

export const rentalRoutes = router;
