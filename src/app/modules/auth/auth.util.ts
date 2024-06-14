import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TJwtPayload } from './auth.interface';

export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatched = await bcryptjs.compare(plainPassword, hashedPassword);
  return isMatched;
};

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
