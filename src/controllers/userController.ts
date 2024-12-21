// bikinin get user all sama get user by id 
import { Request, Response } from "express";
import User from "../models/User";

export const getUserAll = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
}

export const getUserById = async (req:Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
}