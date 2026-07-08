import { Request, Response } from "express";

import { PropertyService } from "./property.service";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { propertyValidation } from "./property.validation";

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const landlordId = res.locals.user.id;
  const payload = req.body;

  propertyValidation.validateCreatePropertyPayload(payload);

  const result = await PropertyService.createPropertyIntoDB(
    payload,
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
  const properties = await PropertyService.getAllPropertiesFromDB(
    req.query as Record<string, string>,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Properties retrieved successfully",
    data: properties,
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
  const payload = req.body;

  propertyValidation.validateUpdatePropertyPayload(payload);

  const updatedProperty = await PropertyService.updatePropertyIntoDB(
    propertyId,
    payload,
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
