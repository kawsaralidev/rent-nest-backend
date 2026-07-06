import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import config from "../../config";
import { TRegisterUser } from "./user.interface";
import { Role } from "../../../generated/prisma/enums";

const registerUserIntoDB = async (payload: TRegisterUser) => {
  const { name, email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: Role.TENANT,
    },
    omit: {
      password: true,
    },
  });

  return newUser;
};

export const userService = {
  registerUserIntoDB,
};
