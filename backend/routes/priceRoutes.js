import express from 'express';
import priceController from '../controllers/priceController.js';

const router = express.Router();

router.post('/', priceController.createDailyPrice);
router.get('/today', priceController.getAllTodayPrices);
router.get('/today/:dropping_point_id', priceController.getTodayPricesByDroppingPoint);

export default router;