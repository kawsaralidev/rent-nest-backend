import { NextFunction, Request, Response } from "express";
import config from "../config";
import { jwtUtils } from "../utils/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error("You are not authorized");
  }

  const accessToken = token.split(" ")[1];

  const verifiedToken = jwtUtils.verifyToken(
    accessToken as string,
    config.jwt_access_secret as string,
  );

  if (!verifiedToken.success) {
    throw new Error("Invalid or expired token");
  }

  res.locals.user = verifiedToken.data;

  next();
};
