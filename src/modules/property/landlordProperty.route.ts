import { Router } from "express";

import { auth } from "../../middleware/auth";
import { PropertyController } from "./property.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Landlord
router.post("/", auth(Role.LANDLORD), PropertyController.createProperty);

router.put("/:id", auth(Role.LANDLORD), PropertyController.updateProperty);

router.delete("/:id", auth(Role.LANDLORD), PropertyController.deleteProperty);

export const landlordPropertyRoutes = router;
