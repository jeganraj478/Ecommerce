export interface Product {
    _id: string;
    name: string;
    price: number;
    image?: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface OrderProduct {
    product: Product;
    quantity: number;
    price: number;
}

export interface ShippingAddress {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

export type PaymentMethod = 'credit_card' | 'paypal' | 'stripe' | 'cash_on_delivery';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';


export interface Order {
    _id: string;
    user: User;
    products: OrderProduct[];
    totalAmount: number;
    shippingAddress?: ShippingAddress;
    paymentMethod?: PaymentMethod;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
  }