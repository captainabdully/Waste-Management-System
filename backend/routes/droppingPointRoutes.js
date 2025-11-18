import express from 'express';
import droppingPointController from '../controllers/droppingPointController.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/', isAdmin, droppingPointController.createDroppingPoint);
router.get('/', droppingPointController.getAllDroppingPoints);
router.get('/:id', droppingPointController.getDroppingPointById);
router.put('/:id', isAdmin, droppingPointController.updateDroppingPoint);
router.delete('/:id', isAdmin, droppingPointController.deleteDroppingPoint);

export default router;