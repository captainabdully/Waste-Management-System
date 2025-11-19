import express from 'express';
import droppingPointController from '../controllers/droppingPointController.js';
// import { isAdmin } from '../middleware/isAdmin.js';
// import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// router.post('/', isAdmin, droppingPointController.createDroppingPoint);
router.post("/dropping-point", droppingPointController.createDroppingPoint);
router.get("/", droppingPointController.getAllDroppingPoints);
router.get("/:id", droppingPointController.getDroppingPointById);
router.put("/:id",  droppingPointController.updateDroppingPoint);
router.delete("/:id", droppingPointController.deleteDroppingPoint);


export default router;