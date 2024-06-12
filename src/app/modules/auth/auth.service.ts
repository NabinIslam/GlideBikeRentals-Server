import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, isPasswordMatched } from './auth.util';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const signupUserIntoDB = async (payload: TUser) => {
  // checking if the user is already exists
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
  // finding the user
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');

  // checking if the password is matching or not
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

  // generating access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // generating refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { user, accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // generating access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const authServices = {
  signupUserIntoDB,
  loginUserFromDB,
  refreshToken,
};
