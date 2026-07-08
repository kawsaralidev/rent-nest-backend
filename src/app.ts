import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { categoryRoutes } from "./modules/category/category.router";
import { propertyRoutes } from "./modules/property/property.route";
import { landlordPropertyRoutes } from "./modules/property/landlordProperty.route";
import { rentalRoutes } from "./modules/rental/rental.route";
import { landlordRoutes } from "./modules/landlord/landlord.route";
import { paymentRoutes } from "./modules/payment/payment.route";
import { reviewRoutes } from "./modules/review/review.route";
import { adminRoutes } from "./modules/admin/admin.route";
const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "RentNest Backend Server Running ",
  });
});

// all api here
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/landlord/properties", landlordPropertyRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/landlord", landlordRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "API Not Found",
  });
});

app.use(globalErrorHandler);
export default app;
