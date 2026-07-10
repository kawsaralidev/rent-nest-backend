import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalController } from "../rental/rental.controller";

const router = Router();
// Landlord
router.get(
  "/requests",
  auth(Role.LANDLORD),
  rentalController.getLandlordRequests,
);

router.patch(
  "/requests/:id",
  auth(Role.LANDLORD),
  rentalController.updateRentalStatus,
);

router.patch(
  "/requests/:id/complete",
  auth(Role.LANDLORD),
  rentalController.completeRental,
);

export const landlordRoutes = router;
