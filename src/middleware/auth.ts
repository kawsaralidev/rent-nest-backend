import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { jwtUtils } from "../utils/jwt";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAysnc";
import config from "../config";
import prisma from "../lib/prisma";

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("You are not authorized.");
    }

    const accessToken = authHeader.split(" ")[1];

    const verifiedToken = jwtUtils.verifyToken(
      accessToken as string,
      config.jwt_access_secret as string,
    );

    if (!verifiedToken.success) {
      throw new Error("Invalid or expired token.");
    }

    const decodedUser = verifiedToken.data as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decodedUser.id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    if (user.status === UserStatus.BANNED) {
      throw new Error("Your account has been banned.");
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      throw new Error(
        "Forbidden. You are not allowed to access this resource.",
      );
    }

    res.locals.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  });
};
