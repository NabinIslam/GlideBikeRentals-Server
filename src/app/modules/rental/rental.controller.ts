import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { rentalServices } from './rental.service';

const createRental = catchAsync(async (req, res) => {
  const result = await rentalServices.createRentalIntoDB(
    req.body,
    req.user.userId,
  );

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

export const rentalControllers = {
  createRental,
};
