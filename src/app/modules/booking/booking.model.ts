import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
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
      required: [true, 'Return time is required.'],
    },
    totalCost: {
      type: Number,
      required: [true, 'Total cost is required.'],
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

export const Booking = model<TBooking>('Booking', bookingSchema);
