const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.post('/', priceController.createDailyPrice);
router.get('/today', priceController.getAllTodayPrices);
router.get('/today/:dropping_point_id', priceController.getTodayPricesByDroppingPoint);

module.exports = router;