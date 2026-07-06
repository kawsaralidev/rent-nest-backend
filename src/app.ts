import cors from "cors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "RentNest Backend Server Running 🚀",
  });
});

export default app;
