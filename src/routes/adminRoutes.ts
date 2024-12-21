import express from "express";
import {
  getDashboard,
  getPenghuniDetail,
  removePenghuni,
  getFacilityReports,
  getAnonymousReports,
  addRoomOccupancy,
  addFacilityReport,
  addAnonymousReport,
} from "../controllers/adminController";

const router = express.Router();

router.post("/dashboard", (req, res) => {
    addRoomOccupancy(req, res);
}
);
router.post("/laporan/fasilitas", (req, res) => {  
    addFacilityReport(req, res);
}
);
router.post("/laporan/penghuni", (req, res) => {
    addAnonymousReport(req, res);
}
);


router.get("/dashboard", (req, res) => {
    getDashboard(req, res);
}
);
router.get("/penghuni/:id", (req, res, next) => {
    getPenghuniDetail(req, res, next);
}
);
router.delete("/penghuni/:id", (req, res) => {
    removePenghuni(req, res);
}
);
router.get("/laporan/fasilitas", (req, res) => {
    getFacilityReports(req, res);
}
);
router.get("/laporan/penghuni", (req, res) => {
    getAnonymousReports(req, res);
}
);
router.delete("/dashboard", (req, res) => {
    removePenghuni(req, res);
}
);
router.delete("/laporan/fasilitas", (req, res) => {
    removePenghuni(req, res);
}
);
router.delete("/laporan/penghuni", (req, res) => {
    removePenghuni(req, res);
}
);


export default router;