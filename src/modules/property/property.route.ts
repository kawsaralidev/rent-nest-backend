import { Router } from "express";
import { PropertyController } from "./property.controller";

const router = Router();

// Public
router.get("/", PropertyController.getAllProperties);

router.get("/:id", PropertyController.getSingleProperty);

export const propertyRoutes = router;
