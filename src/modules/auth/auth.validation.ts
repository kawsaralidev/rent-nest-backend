import { TLoginUser } from "./auth.interface";

const validateLoginPayload = (payload: TLoginUser) => {
  const { email, password } = payload;

  if (!email) {
    throw new Error("Email is required");
  }

  if (typeof email !== "string" || email.trim() === "") {
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  if (typeof password !== "string" || password.trim() === "") {
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
};

export const authValidation = {
  validateLoginPayload,
};
