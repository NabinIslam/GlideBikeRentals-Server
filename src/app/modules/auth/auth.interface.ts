import { Types } from 'mongoose';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  userId: Types.ObjectId | string;
  role: 'admin' | 'user';
};
