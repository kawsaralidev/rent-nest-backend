import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { userValidation } from "./user.validation";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    userValidation.validateRegisterPayload(payload);

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: { user },
    });
  },
);

export const userController = {
  registerUser,
};
