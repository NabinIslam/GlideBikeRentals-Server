import { Schema, model } from 'mongoose';
import { TRental } from './rental.interface';

const rentalSchema = new Schema<TRental>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required.'],
      ref: 'user',
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Bike ID is required.'],
      ref: 'bike',
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required.'],
    },
    returnTime: {
      type: Date,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Rental = model<TRental>('Rental', rentalSchema);
