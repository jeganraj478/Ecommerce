import { Order, OrderStatus, PaymentStatus } from '../types/orderTypes';
import { AxiosConfig } from '../config/AxiosConfig';


export const getAllOrders = async (): Promise<Order[]> => {
    const response = await AxiosConfig.get<Order[]>(`/orders`);
    return response.data;
}

export const getOrderById = async (id: string): Promise<Order> => {
    const response = await axios.get<Order>(`/orders/${id}`);
    return response.data;
}

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const response = await axios.post<Order>(`/orders`, orderData);
    return response.data;
}

export const updateOrderStatus = async (
    id: string,
    orderStatus: OrderStatus,
    paymentStatus?: PaymentStatus
): Promise<Order> => {
    const response = await axios.put<Order>(`/orders/${id}`, {
        orderStatus,
        paymentStatus
    });
    return response.data;
}

export const deleteOrder = async (id: string): Promise<void> => {
    await axios.delete(`/orders/${id}`);
}
