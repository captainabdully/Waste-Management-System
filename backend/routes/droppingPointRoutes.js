import express from 'express';
import droppingPointController from '../controllers/droppingPointController.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// router.post('/', isAdmin, droppingPointController.createDroppingPoint);
router.post("/dropping-point", verifyToken, isAdmin, droppingPointController.createDroppingPoint);
router.get("/", droppingPointController.getAllDroppingPoints);
router.get("/:id", droppingPointController.getDroppingPointById);
router.put("/:id", verifyToken, isAdmin, droppingPointController.updateDroppingPoint);
router.delete("/:id", verifyToken, isAdmin, droppingPointController.deleteDroppingPoint);


export default router;