// src/api/cartAPI.ts
import { AxiosConfig } from '../config/AxiosConfig';
import { AddToCartDTO, CartItem, RemoveFromCartDTO } from '../types/cartTypes';


export const getCart = async (): Promise<{ cart: { items: CartItem[] }, total: number }> => {
    const response = await AxiosConfig.get('/cart');
    // Type assertion to ensure the response matches our expected type
    return response.data as { cart: { items: CartItem[] }, total: number };
}


export const addToCart = async (data: AddToCartDTO): Promise<{ cart: { items: CartItem[] } }> => {
    const response = await AxiosConfig.post('/cart/add', data);
    return response.data as { cart: { items: CartItem[] } };
}


export const removeFromCart = async (data: RemoveFromCartDTO): Promise<{ cart: { items: CartItem[] } }> => {
    const response = await AxiosConfig.post('/cart/remove', data);
    return response.data as { cart: { items: CartItem[] } };
}


export const updateQuantity = async (productId: string, quantity: number): Promise<{ cart: { items: CartItem[] } }> => {
    const response = await AxiosConfig.put('/cart/update', { productId, quantity });
    return response.data as { cart: { items: CartItem[] } };
}


export const clearCart = async (): Promise<void> => {
    await AxiosConfig.delete('/cart');
}
