/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

export type TRental = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
};

export interface CustomDate extends Date {
  expires: Date;
  max: Date;
  min: Date;
  defaultOptions: any; // Define the type of defaultOptions accordingly
}
