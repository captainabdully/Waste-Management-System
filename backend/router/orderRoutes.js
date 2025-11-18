const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createPickupOrder);
router.get('/', orderController.getAllOrders);
router.get('/:vendor_id', orderController.getVendorOrders);
router.put('/:id/status', orderController.updateOrderStatus);
router.post('/completion', orderController.recordOrderCompletion);

module.exports = router;