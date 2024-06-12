import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  // checking if the bike is already exists
  const alreadyExists = await Bike.findOne({
    $and: [{ model: payload.model }, { brand: payload.brand }],
  });

  if (alreadyExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'This bike already exists');

  const bike = await Bike.create(payload);

  if (!bike) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the bike');
  }

  return bike;
};

const updateBikeFromDB = async (id: string, payload: Partial<TBike>) => {
  const updatedBike = await Bike.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!updatedBike)
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not update the bike');

  return updatedBike;
};

const getAllBikesFromDB = async () => {
  const bikes = await Bike.find();

  if (!bikes)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the bikes');

  return bikes;
};

const deleteBikeFromDB = async (id: string) => {
  const bike = await Bike.findByIdAndDelete(id);

  if (!bike)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not delete the bike');

  return bike;
};

export const bikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeFromDB,
  deleteBikeFromDB,
};
