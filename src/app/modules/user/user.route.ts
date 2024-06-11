import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import UserValidationSchema from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidationSchema),
  userControllers.handleCreateUser,
);

export const userRoutes = router;
