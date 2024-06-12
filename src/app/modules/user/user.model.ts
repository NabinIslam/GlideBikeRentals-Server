/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcryptjs from 'bcryptjs';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required.'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;

  // hashing the password
  user.password = await bcryptjs.hash(user.password, Number(config.salt_round));

  next();
});

export const User = model<TUser>('User', userSchema);
