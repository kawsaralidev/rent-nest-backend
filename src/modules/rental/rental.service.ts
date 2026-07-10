import { RentalRequestStatus } from "../../../generated/prisma/enums";
import prisma from "../../lib/prisma";
import { TCreateRental, TUpdateRentalStatus } from "./rental.interface";

const createRentalIntoDB = async (payload: TCreateRental, tenantId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: payload.propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (!property.availability) {
    throw new Error("Property is not available for rent");
  }
  if (property.landlordId === tenantId) {
    throw new Error("You cannot rent your own property");
  }

  const existingPendingRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: RentalRequestStatus.PENDING,
    },
  });

  if (existingPendingRequest) {
    throw new Error(
      "You already have a pending rental request for this property",
    );
  }

  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
    },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
      property: {
        include: {
          category: true,
          landlord: {
            omit: {
              password: true,
            },
          },
        },
      },
    },
  });

  return rentalRequest;
};

const getMyRentalsFromDB = async (tenantId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      property: {
        include: {
          category: true,
          landlord: {
            omit: {
              password: true,
            },
          },
        },
      },
      payment: true,
      review: true,
    },
  });

  return result;
};

const getSingleRentalFromDB = async (rentalId: string, tenantId: string) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
      property: {
        include: {
          category: true,
          landlord: {
            omit: {
              password: true,
            },
          },
        },
      },
      payment: true,
      review: true,
    },
  });

  if (!rental) {
    throw new Error("Rental request not found");
  }

  if (rental.tenantId !== tenantId) {
    throw new Error("Unauthorized access");
  }

  return rental;
};

const getLandlordRequestsFromDB = async (landlordId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
      property: {
        include: {
          category: true,
        },
      },
      payment: true,
      review: true,
    },
  });

  return result;
};

const updateRentalStatusIntoDB = async (
  payload: TUpdateRentalStatus,
  landlordId: string,
  rentalId: string,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      property: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.property.landlordId !== landlordId) {
    throw new Error("Unauthorized access");
  }

  if (rentalRequest.status !== RentalRequestStatus.PENDING) {
    throw new Error("Rental request has already been processed");
  }

  if (
    payload.status !== RentalRequestStatus.APPROVED &&
    payload.status !== RentalRequestStatus.REJECTED
  ) {
    throw new Error("Status must be APPROVED or REJECTED");
  }

  const result = await prisma.rentalRequest.update({
    where: {
      id: rentalId,
    },
    data: {
      status: payload.status,
    },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
      property: {
        include: {
          category: true,
          landlord: {
            omit: {
              password: true,
            },
          },
        },
      },
      payment: true,
      review: true,
    },
  });

  return result;
};

const completeRentalIntoDB = async (rentalId: string, landlordId: string) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      property: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.property.landlordId !== landlordId) {
    throw new Error("Unauthorized access");
  }

  if (rentalRequest.status !== RentalRequestStatus.ACTIVE) {
    throw new Error("Only active rentals can be completed");
  }

  const result = await prisma.rentalRequest.update({
    where: {
      id: rentalId,
    },
    data: {
      status: RentalRequestStatus.COMPLETED,
    },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
      property: {
        include: {
          category: true,
          landlord: {
            omit: {
              password: true,
            },
          },
        },
      },
      payment: true,
      review: true,
    },
  });

  return result;
};

export const rentalService = {
  createRentalIntoDB,
  getMyRentalsFromDB,
  getSingleRentalFromDB,
  getLandlordRequestsFromDB,
  updateRentalStatusIntoDB,
  completeRentalIntoDB,
};
