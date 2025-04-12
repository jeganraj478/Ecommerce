import { Order, IOrder } from '../models/order';

const orderService = {
    createOrder: async (data: Partial<IOrder>): Promise<IOrder> => {
        const newOrder = new Order(data);
        return await newOrder.save();
    },

    getAllOrders: async (): Promise<IOrder[]> => {
        return await Order.find().populate('user').populate('products.product');
    },

    getOrderById: async (orderId: string): Promise<IOrder | null> => {
        return await Order.findById(orderId).populate('user').populate('products.product');
    },

    updateOrderStatus: async (
        orderId: string,
        orderStatus: IOrder['orderStatus'],
        paymentStatus?: IOrder['paymentStatus']
    ): Promise<IOrder | null> => {
        const updateData: Partial<IOrder> = { orderStatus };
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    },

    deleteOrder: async (orderId: string): Promise<IOrder | null> => {
        return await Order.findByIdAndDelete(orderId);
    },
};

export default orderService;
