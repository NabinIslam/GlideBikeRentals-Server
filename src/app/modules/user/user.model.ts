import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

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
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
