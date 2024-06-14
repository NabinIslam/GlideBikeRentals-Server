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

  const createdUser = await User.create(payload);

  if (!createdUser)
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the user');

  const user = await User.findOne({ _id: createdUser._id });

  return user;
};

const loginUserFromDB = async (payload: TLoginUser) => {
  let accessToken;
  let refreshToken;

  // finding the user with the password field
  const foundedUser = await User.findOne({ email: payload.email }).select(
    '+password',
  );

  if (!foundedUser) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');

  // checking if the password is matching or not
  const passwordMatch = await isPasswordMatched(
    payload.password,
    foundedUser.password,
  );

  if (!passwordMatch)
    throw new AppError(httpStatus.BAD_REQUEST, 'Password does not match');

  // finding the user without the password field
  const user = await User.findOne({ _id: foundedUser._id });

  if (user) {
    const jwtPayload = {
      userId: user._id,
      role: user.role,
    };

    // generating access token
    accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    // generating refresh token
    refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );
  }
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
