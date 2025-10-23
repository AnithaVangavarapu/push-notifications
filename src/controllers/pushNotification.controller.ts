import { Request, Response } from "express";
import { pushNotification } from "../services/pushNotification.service";

export const pushNotificationController = async (
  req: Request,
  res: Response
) => {
  const { deviceToken, title, bodyContent } = req.body;
  const result = await pushNotification({ deviceToken, title, bodyContent });
  if (!result.success) {
    return res.status(result.error?.code as number).json({
      message: result.error?.message,
    });
  }
  return res.status(200).json("Notification sent successfully!");
};
