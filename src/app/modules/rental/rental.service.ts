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
    $and: [{ bikeId: payload.bikeId }, { isReturned: false }],
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

const updateRentalAndBikeAfterReturnIntoDB = async (rentalId: string) => {
  // checking if rental is available
  const rental = await Rental.findOne({ _id: rentalId });

  if (!rental)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the rental!');

  const bike = await Bike.findOne({ _id: rental.bikeId });

  if (!bike)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the bike!');

  // updating the bike availability to true
  const updateBikeAvailability = await Bike.findOneAndUpdate(
    { _id: rental.bikeId },
    { isAvailable: true },
    { new: true },
  );

  if (!updateBikeAvailability)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Could not update the bike availability',
    );

  // finding the current time
  const currentTime = new Date();
  const rentalStartTime = new Date(rental.startTime);

  // finding the duration in milliseconds, in seconds, in minutes, and lastly in hours
  const rentalDurationInMilliseconds: number =
    currentTime.getTime() - rentalStartTime.getTime();
  const rentalDurationInSeconds: number = Math.floor(
    rentalDurationInMilliseconds / 1000,
  );
  const rentalDurationInMinutes: number = Math.floor(
    rentalDurationInSeconds / 60,
  );
  const rentalDurationInHours: number = Math.floor(
    rentalDurationInMinutes / 60,
  );

  const bikePricePerHour: number = bike.pricePerHour;

  //calculating the total cost
  const totalCost = rentalDurationInHours * bikePricePerHour;

  const updatedRentalData = {
    returnTime: currentTime.toJSON(),
    totalCost,
    isReturned: true,
  };

  const updatedRental = await Rental.findByIdAndUpdate(
    { _id: rental._id },
    updatedRentalData,
    { new: true },
  );

  if (!updatedRental)
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not update the rental');

  return updatedRental;
};

const getAllRentalsFromDB = async () => {
  const rentals = await Rental.find();

  if (!rentals)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the rentals');

  return rentals;
};

export const rentalServices = {
  createRentalIntoDB,
  updateRentalAndBikeAfterReturnIntoDB,
  getAllRentalsFromDB,
};
