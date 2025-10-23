import { Request, Response, NextFunction } from "express";
import Joi, { ValidationError } from "joi";

//Joi schema
const pushNotification = Joi.object()
  .keys({
    deviceToken: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    bodyContent: Joi.string().trim().required(),
  })
  .unknown(false);

export const pushNotificationValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await pushNotification.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body = value;
    next();
  } catch (error) {
    //Validation errors from Joi schemas
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: "validation failed",
        details: error.details.map((d: any) => d.message),
      });
    }

    console.log("Error in push notification middleware :", error);
    //Unexpected error
    return res.status(500).json({
      message: "server error",
    });
  }
};
