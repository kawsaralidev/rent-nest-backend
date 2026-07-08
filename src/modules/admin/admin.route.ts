import express from "express";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);

router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);

router.get("/properties", auth(Role.ADMIN), adminController.getAllProperties);

router.get("/rentals", auth(Role.ADMIN), adminController.getAllRentals);

export const adminRoutes = router;
