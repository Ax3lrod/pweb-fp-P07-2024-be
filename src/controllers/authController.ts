import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ApiResponse } from "../types/response";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
      return;
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      res.status(400).json({
        status: "error",
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const response: ApiResponse = {
      status: "success",
      message: "User registered successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
      return;
    }

    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const response: ApiResponse = {
      status: "success",
      message: "User logged in successfully",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
