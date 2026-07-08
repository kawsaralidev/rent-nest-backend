import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";
import { Request, Response } from "express";

const createRental = catchAsync(async (req: Request, res: Response) => {
  const tenantId = res.locals.user.id;

  const result = await rentalService.createRentalIntoDB(req.body, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Rental request submitted successfully",
    data: result,
  });
});

const getMyRentals = catchAsync(async (req: Request, res: Response) => {
  const tenantId = res.locals.user.id;

  const result = await rentalService.getMyRentalsFromDB(tenantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

const getSingleRental = catchAsync(async (req: Request, res: Response) => {
  const rentalId = req.params.id as string;
  const tenantId = res.locals.user.id;

  const result = await rentalService.getSingleRentalFromDB(rentalId, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental request retrieved successfully",
    data: result,
  });
});

const getLandlordRequests = catchAsync(async (req, res) => {
  const landlordId = res.locals.user.id;

  const result = await rentalService.getLandlordRequestsFromDB(landlordId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

export const rentalController = {
  createRental,
  getMyRentals,
  getSingleRental,
  getLandlordRequests,
};
