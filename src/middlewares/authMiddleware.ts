import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AUTH_COOKIE_KEY } from "../constants";
import { APIError } from "../utilities/APIError";
import { ERROR_STATUS_CODE, UNAUTHORIZED_REQUEST } from "../utilities/errorConstants";
import { jwtSecretKey } from "../config";
import logger from "../utilities/logger";

export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies[AUTH_COOKIE_KEY];
  try {
    if (!token) return next(new APIError(ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE, UNAUTHORIZED_REQUEST));

    const verified = JWT.verify(token, jwtSecretKey) as {
      userId: string;
      iat: number;
      exp: number;
    };

    if (!verified) return next(new APIError(ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE, UNAUTHORIZED_REQUEST));

    req.body.userId = verified.userId;
    next();
  } catch (err) {
    logger.error(`Unauthenticated Request with token ${token}`);
    return next(new APIError(ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE, UNAUTHORIZED_REQUEST));
  }
};
