import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import config from '../../config';

const signup = catchAsync(async (req, res) => {
  const user = await authServices.signupUserIntoDB(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authServices.loginUserFromDB(req.body);

  const { user, accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrieved successfully!',
    data: result,
  });
});

export const authControllers = {
  signup,
  login,
  refreshToken,
};
