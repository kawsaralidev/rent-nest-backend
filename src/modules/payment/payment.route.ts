import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/create", auth(Role.TENANT), paymentController.createPayment);

router.post("/webhook", paymentController.stripeWebhook);

router.get("/", auth(Role.TENANT), paymentController.getMyPayments);

router.get("/:id", auth(Role.TENANT), paymentController.getSinglePayment);

export const paymentRoutes = router;
