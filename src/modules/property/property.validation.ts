import { TCreateProperty, TUpdateProperty } from "./property.interface";

const validateCreatePropertyPayload = (payload: TCreateProperty) => {
  const { title, description, location, price, categoryId, amenities } =
    payload;

  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Title is required");
  }

  if (title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters");
  }

  if (typeof description !== "string" || description.trim() === "") {
    throw new Error("Description is required");
  }

  if (typeof location !== "string" || location.trim() === "") {
    throw new Error("Location is required");
  }

  if (typeof price !== "number" || price <= 0) {
    throw new Error("Price must be greater than 0");
  }

  if (typeof categoryId !== "string" || categoryId.trim() === "") {
    throw new Error("Category ID is required");
  }

  if (!Array.isArray(amenities)) {
    throw new Error("Amenities must be an array");
  }
};

const validateUpdatePropertyPayload = (payload: TUpdateProperty) => {
  const { title, description, location, price, amenities } = payload;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("Title cannot be empty");
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim() === "") {
      throw new Error("Description cannot be empty");
    }
  }

  if (location !== undefined) {
    if (typeof location !== "string" || location.trim() === "") {
      throw new Error("Location cannot be empty");
    }
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) {
      throw new Error("Price must be greater than 0");
    }
  }

  if (amenities !== undefined) {
    if (!Array.isArray(amenities)) {
      throw new Error("Amenities must be an array");
    }
  }
};

export const propertyValidation = {
  validateCreatePropertyPayload,
  validateUpdatePropertyPayload,
};
