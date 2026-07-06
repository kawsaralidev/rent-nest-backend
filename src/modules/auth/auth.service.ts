import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password is incorrect");
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const authService = {
  loginUser,
};
