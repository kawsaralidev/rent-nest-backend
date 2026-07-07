import prisma from "../../lib/prisma";
import { TCreateProperty } from "./property.interface";

const createPropertyIntoDB = async (
  payload: TCreateProperty,
  landlordId: string,
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const result = await prisma.property.create({
    data: {
      title: payload.title,
      description: payload.description,
      location: payload.location,
      price: payload.price,
      amenities: payload.amenities,
      landlordId,
      categoryId: payload.categoryId,
    },
    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });

  return result;
};

const getAllPropertiesFromDB = async () => {
  const result = await prisma.property.findMany({
    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSinglePropertyFromDB = async (propertyId: string) => {
  const result = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });

  if (!result) {
    throw new Error("Property not found");
  }

  return result;
};

const updatePropertyIntoDB = async (
  propertyId: string,
  payload: Partial<TCreateProperty>,
  landlordId: string,
) => {
  const existingProperty = await prisma.property.findUniqueOrThrow({
    where: {
      id: propertyId,
    },
  });
  // owner check
  if (existingProperty.landlordId !== landlordId) {
    throw new Error("You are not authorized to update this property");
  }
  //   property update
  const updatedProperty = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: payload,
    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });

  return updatedProperty;

  return updatedProperty;
};

const deletePropertyFromDB = async (propertyId: string, landlordId: string) => {
  const existingProperty = await prisma.property.findUniqueOrThrow({
    where: {
      id: propertyId,
    },
  });

  if (existingProperty.landlordId !== landlordId) {
    throw new Error("You are not authorized to delete this property");
  }

  const deletedProperty = await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });

  return deletedProperty;
};

export const PropertyService = {
  createPropertyIntoDB,
  getAllPropertiesFromDB,
  getSinglePropertyFromDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
};
