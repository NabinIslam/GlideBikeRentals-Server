import express from 'express';

import { bikeControllers } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bikeValidations } from './bike.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidations.bikeValidationSchema),
  bikeControllers.createBike,
);

router.get('/', bikeControllers.getAllBikes);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidations.updateBikeValidationSchema),
  bikeControllers.updateBike,
);

router.delete('/:id', auth(USER_ROLE.admin), bikeControllers.deleteBike);

export const bikeRoutes = router;
