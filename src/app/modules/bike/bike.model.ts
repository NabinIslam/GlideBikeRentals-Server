import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, 'Bike name is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Bike description is required.'],
      trim: true,
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required.'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: Number,
      required: [true, 'CC (engine capacity) is required.'],
    },
    year: {
      type: Number,
      required: [true, 'Manufacturing year is required.'],
    },
    model: {
      type: String,
      required: [true, 'Bike model is required.'],
    },
    brand: {
      type: String,
      required: [true, 'Bike brand is required.'],
    },
  },
  {
    timestamps: true,
  },
);

export const Bike = model<TBike>('Bike', bikeSchema);
