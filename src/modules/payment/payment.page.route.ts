import { Router } from "express";

const router = Router();

router.get("/success", (req, res) => {
  res.send("Payment completed successfully.");
});

router.get("/cancel", (req, res) => {
  res.send("Payment cancelled.");
});

export const paymentPageRoutes = router;
