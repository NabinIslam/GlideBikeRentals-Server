import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const profile = catchAsync(async (req, res) => {
  const result = await userServices.getProfileFromDB(req.user.userId);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const userControllers = {
  profile,
};
