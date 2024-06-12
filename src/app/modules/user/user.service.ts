import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from './user.model';

const getProfileFromDB = async (id: string) => {
  const user = await User.findOne({ _id: id });

  if (!user) throw new AppError(httpStatus.BAD_REQUEST, 'User not found');

  return user;
};

export const userServices = {
  getProfileFromDB,
};
