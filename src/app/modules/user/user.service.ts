import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const userRegister = async (userData: TUser) => {
  const alreadyExists = await User.findOne({ email: userData.email });

  if (alreadyExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'This user already exists');

  const user = await User.create(userData);

  if (!user)
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the user');

  return user;
};

export const userServices = {
  userRegister,
};
