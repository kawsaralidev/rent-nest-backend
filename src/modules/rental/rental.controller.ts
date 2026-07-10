import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";
import { Request, Response } from "express";
import { rentalValidation } from "./rental.validation";

const createRental = catchAsync(async (req: Request, res: Response) => {
  const tenantId = res.locals.user.id;
  const payload = req.body;

  rentalValidation.validateCreateRentalPayload(payload);

  const result = await rentalService.createRentalIntoDB(payload, tenantId);

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

const updateRentalStatus = catchAsync(async (req: Request, res: Response) => {
  const landlordId = res.locals.user.id;
  const rentalId = req.params.id as string;
  const payload = req.body;

  rentalValidation.validateUpdateRentalStatusPayload(payload);

  const result = await rentalService.updateRentalStatusIntoDB(
    payload,
    landlordId,
    rentalId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental request updated successfully",
    data: result,
  });
});

const completeRental = catchAsync(async (req: Request, res: Response) => {
  const landlordId = res.locals.user.id;
  const rentalId = req.params.id as string;

  const result = await rentalService.completeRentalIntoDB(rentalId, landlordId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental completed successfully",
    data: result,
  });
});

export const rentalController = {
  createRental,
  getMyRentals,
  getSingleRental,
  getLandlordRequests,
  updateRentalStatus,
  completeRental,
};
