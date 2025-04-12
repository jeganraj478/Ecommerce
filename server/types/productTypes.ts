import { IProduct } from "../models/product";

export interface ProductQueryParams {
    category?: string;
    search?: string;
    sort?: string;
    limit: number;
    page: number;
}
export interface ProductResponse {
    products: IProduct[]; 
    totalPages: number; 
    currentPage: number; 
    total: number;
}