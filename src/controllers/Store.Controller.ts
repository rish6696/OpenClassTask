import { Request, Response, NextFunction } from "express";

import { APIError } from "../utilities/APIError";
import { UNEXPECTED_ERROR,generateError, ERROR_STATUS_CODE } from "../utilities/errorConstants";

import logger from "../utilities/logger";

import { ClassModel } from "../models/model.index";
import moment from "moment";
import { TIME_FORMAT } from "../constants";

export const createClassController = async(req: Request, res: Response, next: NextFunction) => {
  const data = req.body as {
    title: string;
    price: number;
    startTime: string;
    endTime: string;
    userId: string;
  };
  try {
    const { title, startTime, endTime, userId, price } = data;

    const newClass = new ClassModel({
      title,
      price,
      startTime: moment(startTime, TIME_FORMAT),
      endTime: moment(endTime, TIME_FORMAT),
      storeId:userId,
    });
    
    const result = await newClass.save();
    logger.info(`Class Created with info ${JSON.stringify(result)}`)

    res.send({status:true,message:`Class created successfully`})
  } catch (error) {
      logger.error(`Error while creating class ${generateError(error)}`)
      return next(new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE,UNEXPECTED_ERROR))
  }
};
