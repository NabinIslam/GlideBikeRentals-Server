import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const handleCreateUser = catchAsync(async (req, res) => {
  const user = await userServices.userRegister(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

export const userControllers = {
  handleCreateUser,
};
