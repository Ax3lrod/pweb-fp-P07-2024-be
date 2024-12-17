import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { connectDB } from "./config/database";
import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./routes/authRoutes";
import e from "express";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.get("/", (_, res) => {
  res.status(200).send("Server is up and running 💫");
});

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
    data: {},
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    data: {},
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
