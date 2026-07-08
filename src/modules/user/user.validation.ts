import { Role } from "../../../generated/prisma/enums";
import { TRegisterUser } from "./user.interface";

const validateRegisterPayload = (payload: TRegisterUser) => {
  const { name, email, password, role } = payload;

  // Name
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required");
  }

  if (name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters");
  }

  if (name.trim().length > 50) {
    throw new Error("Name cannot exceed 50 characters");
  }

  // Email
  if (typeof email !== "string" || email.trim() === "") {
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    throw new Error("Invalid email format");
  }

  // Password
  if (typeof password !== "string" || password.trim() === "") {
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (password.length > 20) {
    throw new Error("Password cannot exceed 20 characters");
  }

  // Role
  if (!role) {
    throw new Error("Role is required");
  }

  if (role !== Role.TENANT && role !== Role.LANDLORD) {
    throw new Error("Role must be TENANT or LANDLORD");
  }
};

export const userValidation = {
  validateRegisterPayload,
};
