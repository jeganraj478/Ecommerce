export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
  }
  
  export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
  }
  
  export interface AddToCartDTO {
    productId: string;
    quantity: number;
    price: number;
  }
  
  export interface RemoveFromCartDTO {
    productId: string;
  }