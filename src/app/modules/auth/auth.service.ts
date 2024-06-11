import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const signupUserIntoDB = async (payload: TUser) => {
  const alreadyRegistered = await User.findOne({ email: payload.email });

  if (alreadyRegistered)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This user is already registered',
    );

  const user = await User.create(payload);

  if (!user)
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the user');

  return user;
};

export const authServices = {
  signupUserIntoDB,
};
