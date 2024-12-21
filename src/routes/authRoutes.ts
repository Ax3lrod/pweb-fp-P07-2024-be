import express from "express";
import { register, login } from "../controllers/authController";
import { getUserAll, getUserById } from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users",  (req, res) => {
    getUserAll(req, res);
}
);

router.get("/users/:id", (req, res) => {
    getUserById(req, res);
}
);


export default router;
