import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as DecodedToken;

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        status: "error",
        message: "Not authorized, token failed",
      });
    }

    if (!token) {
      res.status(401).json({
        status: "error",
        message: "Not authorized, no token",
      });
    }
  }
};

export default protect;
