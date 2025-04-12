import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

// Create Order
router.post('/', orderController.createOrder);

// Get All Orders
router.get('/', orderController.getAllOrders);

// Get Order by ID
router.get('/:id', orderController.getOrderById);

// Update Order Status
router.patch('/:id/status', orderController.updateOrderStatus);

// Delete Order
router.delete('/:id', orderController.deleteOrder);

export default router;
