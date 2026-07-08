import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { authValidation } from "./auth.validation";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  authValidation.validateLoginPayload(payload);

  const user = await authService.loginUser(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: user,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.getMe(res.locals.user.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: user,
  });
});

export const authController = {
  loginUser,
  getMe,
};
