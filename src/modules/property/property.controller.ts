import { Request, Response } from "express";

import { PropertyService } from "./property.service";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const landlordId = res.locals.user.id;

  const result = await PropertyService.createPropertyIntoDB(
    req.body,
    landlordId,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Property created successfully",
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.getAllPropertiesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Properties retrieved successfully",
    data: result,
  });
});

const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
  const propertyId = req.params.id as string;

  const result = await PropertyService.getSinglePropertyFromDB(propertyId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Property retrieved successfully",
    data: result,
  });
});

const updateProperty = catchAsync(async (req, res) => {
  const propertyId = req.params.id as string;
  const landlordId = res.locals.user.id;

  const updatedProperty = await PropertyService.updatePropertyIntoDB(
    propertyId,
    req.body,
    landlordId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Property updated successfully",
    data: updatedProperty,
  });
});

const deleteProperty = catchAsync(async (req, res) => {
  const propertyId = req.params.id as string;
  const landlordId = res.locals.user.id;

  const deletedProperty = await PropertyService.deletePropertyFromDB(
    propertyId,
    landlordId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Property deleted successfully",
    data: deletedProperty,
  });
});

export const PropertyController = {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
