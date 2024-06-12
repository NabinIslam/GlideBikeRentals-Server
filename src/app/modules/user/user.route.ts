import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userControllers } from './user.controller';

const router = express.Router();

router.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  userControllers.profile,
);
router.put(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  userControllers.updateProfile,
);

export const userRoutes = router;
