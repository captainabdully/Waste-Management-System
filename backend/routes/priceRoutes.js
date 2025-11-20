import express from 'express';
import priceController from '../controllers/priceController.js';

const router = express.Router();

router.post('/', priceController.createDailyPrice);
router.get('/today', priceController.getAllTodayPrices);
router.get('/today/:dropping_point_id', priceController.getTodayPricesByDroppingPoint);
router.get('/history', priceController.getAllPreviousPrices);
router.get('/history/:location_id', priceController.getPreviousPricesByLocation);
router.get("/sort/category", priceController.sortByCategory);
router.get("/filter/date-range", priceController.filterByDateRange);
router.get("/last-7-days", priceController.last7Days);
router.get("/last-30-days", priceController.last30Days);
router.get("/group-by-date", priceController.groupByDate);

export default router;

//GET http://localhost:5001/api/daily-price/sort/category
//Example GET http://localhost:5001/api/daily-price/filter/date-range?start_date=2025-01-01&end_date=2025-01-31
//GET http://localhost:5001/api/daily-price/last-7-days
//GET http://localhost:5001/api/daily-price/last-30-days
//GET http://localhost:5001/api/daily-price/group-by-date