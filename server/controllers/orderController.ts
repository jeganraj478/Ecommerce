import { Request, Response } from 'express';
import orderService from '../services/orderService';

const orderController = {
    createOrder: async (req: Request, res: Response): Promise<void> => {
        try {
            const order = await orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
        }
    },

    getAllOrders: async (req: Request, res: Response): Promise<void> => {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error });
        }
    },

    getOrderById: async (req: Request, res: Response): Promise<void> => {
        try {
            const order = await orderService.getOrderById(req.params.id);
            if (!order) {
                res.status(404).json({ message: 'Order not found' })
                return
            };
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order', error });
        }
    },

    updateOrderStatus: async (req: Request, res: Response): Promise<void> => {
        try {
            const { orderStatus, paymentStatus } = req.body;
            const order = await orderService.updateOrderStatus(req.params.id, orderStatus, paymentStatus);
            if (!order) {
                res.status(404).json({ message: 'Order not found' })
                return
            };
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error updating order status', error });
        }
    },

    deleteOrder: async (req: Request, res: Response): Promise<void> => {
        try {
            const order = await orderService.deleteOrder(req.params.id);
            if (!order) {
                res.status(404).json({ message: 'Order not found' })
                return
            };
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order', error });
        }
    },
};

export default orderController;
