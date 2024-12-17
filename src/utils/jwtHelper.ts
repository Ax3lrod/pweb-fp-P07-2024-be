import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

export default generateToken;
