import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../error/AppError';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token)
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
