import { Request, Response, NextFunction } from "express";
import { jwtSecretKey, mailUsername } from "../config";
import { AUTH_COOKIE_KEY, REGISTER_STORE_MAIL_INFO, TOKEN_TYPES } from "../constants";

import { APIError } from "../utilities/APIError";
import {
  UNEXPECTED_ERROR,
  generateError,
  UNAUTHORIZED_REQUEST,
  ERROR_STATUS_CODE,
  EMAIL_ALREADY_EXISTS,
  INTERNAL_SERVER_ERROR,
  LINK_EXPIRED,
  WRONG_PASSWORD,
  EMAIL_NOT_EXISTS,
} from "../utilities/errorConstants";
import logger from "../utilities/logger";
import { saltRound } from "../config";
import Bcrypt from "bcrypt";
import JWT, { TokenExpiredError } from "jsonwebtoken";
import mailTransporter from "../services/mailService";
import { StoreModel } from "../models/model.index";

export const logoutController = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie(AUTH_COOKIE_KEY);
  res.send({ status: true });
};

export const registerStoreController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as {
    firstName: string;
    lastName: string;
    email: string;
    businessName: string;
    phone?: string;
  };

  logger.info(`Register store with data ${JSON.stringify(data)}`);

  const { firstName, lastName, email, phone, businessName } = data;

  try {
    const result = await StoreModel.findOne({ email });

    if (result) return next(new APIError(ERROR_STATUS_CODE.BAD_REQUEST_CODE, EMAIL_ALREADY_EXISTS));

    const token = JWT.sign(
      {
        tokenType: TOKEN_TYPES.REGISTER_STORE_AUTHENTICATION_TOKEN_TYPE,
        firstName,
        lastName,
        email,
        businessName,
        phone,
      },
      jwtSecretKey,
      { expiresIn: 60 * 5 }
    );

    const mailResponse = await mailTransporter().sendMail({
      from: mailUsername,
      to: [email],
      subject: REGISTER_STORE_MAIL_INFO.SUBJECT,
      html: REGISTER_STORE_MAIL_INFO.Text(token),
    });

    logger.info(
      `email verification sent for store id ${email} with response ${JSON.stringify(mailResponse)}`
    );

    res.send({ status: true, message: "Please check your mail" });
  } catch (error) {
    logger.error(
      `Error while registering user with email ${email} and error ${generateError(error)}`
    );
    return next(new APIError(500, UNEXPECTED_ERROR));
  }
};

export const createStorePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { password, token } = req.body as { password: string; token: string };
  let userEmail;
  token = decodeURIComponent(token);

  try {
    const data = JWT.verify(token, jwtSecretKey) as {
      tokenType: number;
      firstName: string;
      lastName: string;
      email: string;
      businessName: string;
      phone?: string;
    };

    logger.info(`create store  password request with data ${JSON.stringify(data)}`);

    const { tokenType, firstName, lastName, email, businessName, phone } = data;

    userEmail = email;

    if (!data || tokenType !== TOKEN_TYPES.REGISTER_STORE_AUTHENTICATION_TOKEN_TYPE)
      return next(new APIError(ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE, UNAUTHORIZED_REQUEST));

    const hashedPassword = await Bcrypt.hash(password, parseInt(saltRound));

    const store = new StoreModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      businessName,
      phone,
    });

    const result = await store.save();

    logger.info(`store created with details  ${JSON.stringify(result)}`);
    res.send({ status: true, message: "Password created successfully" });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      logger.info(`create store password token expired for email ${userEmail}`);
      return next(new APIError(ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE, LINK_EXPIRED));
    }

    logger.error(
      `Error while creating password for email ${userEmail} with error ${generateError(error)}`
    );
    return next(new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, INTERNAL_SERVER_ERROR));
  }
};

export const loginStoreController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as { email: string; password: string };

  logger.info(`Login store with email ${JSON.stringify(data.email)}`);
  try {
    const { email, password } = data;

    const response = await StoreModel.findOne({ email });

    if (!response)
      return next(new APIError(ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE, EMAIL_NOT_EXISTS));

    const dbPassword = response.password;
    const userId = response._id;

    const verify = await Bcrypt.compare(password, dbPassword);

    if (verify == true) {
      const token = JWT.sign(
        { userId, tokenType: TOKEN_TYPES.LOGIN_STORE_TOKEN_TYPE },
        jwtSecretKey
      );
      res.cookie(AUTH_COOKIE_KEY, token, { httpOnly: true });
      res.send({ status: true });
    } else {
      return next(new APIError(ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE, WRONG_PASSWORD));
    }
  } catch (error) {
    logger.error(`Error while login to store with email ${data.email} ${generateError(error)}`);
    next(new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, UNEXPECTED_ERROR));
  }
};
