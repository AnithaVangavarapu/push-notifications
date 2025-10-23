import { Router } from "express";
import { pushNotificationValidation } from "../middlewares/pushNotificationValidation.middleware";
import { pushNotificationController } from "../controllers/pushNotification.controller";
const router = Router();
router.post("/", pushNotificationValidation, pushNotificationController);
export default router;
