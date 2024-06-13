import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Rental } from './rental.model';
import { TRental } from './rental.interface';
import { Bike } from '../bike/bike.model';

const createRentalIntoDB = async (
  payload: Partial<TRental>,
  userId: string,
) => {
  // checking if the rental is already exists
  const alreadyExists = await Rental.findOne({
    $and: [{ userId }, { bikeId: payload.bikeId }],
  });

  if (alreadyExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'This rental already exists');

  // checking if the bike is available
  const bike = await Bike.findOne({ _id: payload.bikeId });

  if (!bike?.isAvailable)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The bike is not available right now.',
    );

  // updating bikes availability to false
  await Bike.findByIdAndUpdate(
    { _id: payload.bikeId },
    { isAvailable: false },
    { new: true },
  );

  const rentalData = {
    userId,
    bikeId: payload.bikeId,
    startTime: payload.startTime,
  };

  const rental = await Rental.create(rentalData);

  if (!rental) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the rental');
  }

  return rental;
};

export const rentalServices = {
  createRentalIntoDB,
};
