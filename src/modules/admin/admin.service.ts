import { UserStatus } from "../../../generated/prisma/enums";
import prisma from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    omit: {
      password: true,
    },
  });

  return users;
};

const updateUserStatusIntoDB = async (
  payload: { status: UserStatus },
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (
    payload.status !== UserStatus.ACTIVE &&
    payload.status !== UserStatus.BANNED
  ) {
    throw new Error("Status must be ACTIVE or BANNED");
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: payload.status,
    },
    omit: {
      password: true,
    },
  });

  return result;
};

const getAllPropertiesFromDB = async () => {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      landlord: {
        omit: {
          password: true,
        },
      },
      rentalRequests: true,
      reviews: true,
    },
  });

  return properties;
};

const getAllRentalsFromDB = async () => {
  const rentals = await prisma.rentalRequest.findMany({
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

  return rentals;
};

export const adminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllPropertiesFromDB,
  getAllRentalsFromDB,
};
