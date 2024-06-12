import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, isPasswordMatched } from './auth.util';

const signupUserIntoDB = async (payload: TUser) => {
  const alreadyRegistered = await User.findOne({ email: payload.email });

  if (alreadyRegistered)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This user is already registered',
    );

  const user = await User.create(payload);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the user');
  }

  return user;
};

const loginUserFromDB = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!passwordMatch)
    throw new AppError(httpStatus.BAD_REQUEST, 'Password does not match');

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
};

export const authServices = {
  signupUserIntoDB,
  loginUserFromDB,
};
