import { Request, Response } from "express";

import { adminService } from "./admin.service";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { adminValidation } from "./admin.validation";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const userId = req.params.id as string;

  adminValidation.validateUpdateUserStatusPayload(payload);

  const result = await adminService.updateUserStatusIntoDB(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllPropertiesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Properties retrieved successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllRentalsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentals,
};
