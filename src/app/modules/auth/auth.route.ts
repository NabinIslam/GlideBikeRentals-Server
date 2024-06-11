import express from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidations.userValidationSchema),
  authControllers.signup,
);

export const authRoutes = router;
