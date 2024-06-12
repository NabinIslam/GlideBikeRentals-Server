import express from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { authValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidations.userValidationSchema),
  authControllers.signup,
);

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.login,
);

router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const authRoutes = router;
