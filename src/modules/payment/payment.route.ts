import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/create", auth(Role.TENANT), paymentController.createPayment);

router.post("/confirm", auth(Role.TENANT), paymentController.confirmPayment);

router.get("/", auth(Role.TENANT), paymentController.getMyPayments);

router.get("/:id", auth(Role.TENANT), paymentController.getSinglePayment);

export const paymentRoutes = router;
