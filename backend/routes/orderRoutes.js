import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.createPickupOrder);
router.get('/', orderController.getAllOrders);
router.get('/:vendor_id', orderController.getVendorOrders);
router.put('/:id/status', orderController.updateOrderStatus);
router.post('/completion', orderController.recordOrderCompletion);

export default router;