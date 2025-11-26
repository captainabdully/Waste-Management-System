import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Allow creating first admin without token
router.post("/admin", userController.createAdminSetup);

export default router;
