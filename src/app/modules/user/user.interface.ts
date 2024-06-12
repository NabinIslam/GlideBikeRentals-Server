import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
};

export type TUserRole = keyof typeof USER_ROLE;
