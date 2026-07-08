import { RentalRequestStatus } from "../../../generated/prisma/enums";

export type TCreateRental = {
  propertyId: string;
};

export type TUpdateRentalStatus = {
  status: RentalRequestStatus;
};
