import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import { TLoginUser } from "./auth.interface";
import { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions["expiresIn"],
  );

  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    omit: {
      password: true,
    },
  });
  return {
    accessToken,
    user: userInfo,
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

export const authService = {
  loginUser,
  getMe,
};
