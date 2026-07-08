import { RentalRequestStatus } from "../../../generated/prisma/enums";
import { TCreateRental, TUpdateRentalStatus } from "./rental.interface";

const validateCreateRentalPayload = (payload: TCreateRental) => {
  const { propertyId } = payload;

  if (typeof propertyId !== "string" || propertyId.trim() === "") {
    throw new Error("Property ID is required");
  }
};

const validateUpdateRentalStatusPayload = (payload: TUpdateRentalStatus) => {
  const { status } = payload;

  if (!status) {
    throw new Error("Status is required");
  }

  if (
    status !== RentalRequestStatus.APPROVED &&
    status !== RentalRequestStatus.REJECTED
  ) {
    throw new Error("Status must be APPROVED or REJECTED");
  }
};

export const rentalValidation = {
  validateCreateRentalPayload,
  validateUpdateRentalStatusPayload,
};
