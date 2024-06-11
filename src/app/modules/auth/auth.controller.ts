import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const signup = catchAsync(async (req, res) => {
  const user = await authServices.signupUserIntoDB(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

export const authControllers = {
  signup,
};
