import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "RentNest Backend Server Running 🚀",
  });
});

export default app;
