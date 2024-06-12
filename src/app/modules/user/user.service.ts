import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';

const getProfileFromDB = async (id: string) => {
  const user = await User.findOne({ _id: id });

  if (!user) throw new AppError(httpStatus.BAD_REQUEST, 'User not found');

  return user;
};

const updateProfileFromDB = async (id: string, payload: Partial<TUser>) => {
  const updatedUser = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!updatedUser)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Could not update the user profile',
    );

  return updatedUser;
};

export const userServices = {
  getProfileFromDB,
  updateProfileFromDB,
};
