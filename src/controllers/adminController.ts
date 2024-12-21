import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import InvoiceHistory from "../models/InvoiceHistory";
import RoomOccupancy from "../models/RoomOccupancy";
import DamageReporting from "../models/DamageReporting";
import UserReport from "../models/UserReport";
import DetailPenghuni from "../models/DetailPenghuni";

// POST /admin/dashboard
export const addRoomOccupancy = async (req: Request, res: Response) => {
    const { empty, filled } = req.body;
    try {
      const newOccupancy = await RoomOccupancy.create({ empty, filled });
      res.status(201).json(newOccupancy);
    } catch (error) {
      res.status(500).json({ message: "Error adding room occupancy", error });
    }
  };
  
  // POST /admin/laporan/fasilitas
  export const addFacilityReport = async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    try {
      const newReport = await DamageReporting.create({ userId, message });
      res.status(201).json(newReport);
    } catch (error) {
      res.status(500).json({ message: "Error adding facility report", error });
    }
  };
  
  // POST /admin/laporan/penghuni
  export const addAnonymousReport = async (req: Request, res: Response) => {
    const { message } = req.body;
    try {
      const newReport = await UserReport.create({ message });
      res.status(201).json(newReport);
    } catch (error) {
      res.status(500).json({ message: "Error adding anonymous report", error });
    }
  };
  

// GET /admin/dashboard
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const occupancy = await RoomOccupancy.findOne();
    res.json({ occupancy });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard data", error });
  }
};

// GET /admin/penghuni/:id
export const getPenghuniDetail = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Penghuni not found" });

    const invoiceHistory = await InvoiceHistory.find({ userId: id });
    res.json({ user, invoiceHistory });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user details", error });
  }
};



// DELETE /admin/penghuni/:id
export const removePenghuni = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Penghuni not found" });

    await InvoiceHistory.deleteMany({ userId: id }); // Cleanup related data
    res.json({ message: `Penghuni ${user.username} removed successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error removing user", error });
  }
};

// GET /admin/laporan/fasilitas
export const getFacilityReports = async (req: Request, res: Response) => {
  try {
    const reports = await DamageReporting.find({ userId: { $ne: null } }).populate("userId", "username");
    res.json({ reports });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving facility reports", error });
  }
};

// GET /admin/laporan/penghuni
export const getAnonymousReports = async (req: Request, res: Response) => {
  try {
    const reports = await UserReport.find();
    res.json({ reports });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving anonymous reports", error });
  }
};

// POST /admin/detailpenghuni
export const addDetailPenghuni = async (req: Request, res: Response) => {
    const { userId, StatusPembayaran,TanggalPembayaran, TagihanBulan } = req.body;
    try {
      const newReport = await DetailPenghuni.create({ userId, StatusPembayaran,TanggalPembayaran, TagihanBulan });
      res.status(201).json(newReport);
    } catch (error) {
      res.status(500).json({ message: "Error adding facility report", error });
    }
  };

// GET /admin/detailpenghuni
export const getDetailPenghuni = async (req: Request, res: Response) => {
    try {
      const reports = await DetailPenghuni.find({ userId: { $ne: null } }).populate("userId", "username");
      res.json({ reports });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving facility reports", error });
    }
  };
