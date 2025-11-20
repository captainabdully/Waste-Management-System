import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.createPickupOrder);
router.get('/', orderController.getAllOrders);
router.get('/:vendor_id', orderController.getVendorOrders);
router.put('/:id/status', orderController.updateOrderStatus);
router.post('/completion', orderController.recordOrderCompletion);
router.get('/order/:id', orderController.getOrderById);
router.get('/history/', orderController.getOrderHistory);

export default router;

//GET http://localhost:5001/api/pickup-order/history?status=completed
//GET http://localhost:5001/api/pickup-order/history?status=completed
//GET http://localhost:5001/api/pickup-order/history?dropping_point_id=4
//GET http://localhost:5001/api/pickup-order/history?start_date=2025-02-01&end_date=2025-02-15
