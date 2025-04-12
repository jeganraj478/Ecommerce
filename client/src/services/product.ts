import { Product, ProductsResponse, ProductFilters } from '../types/productTypes';
import { AxiosConfig } from '../config/AxiosConfig';

// Get all products with filters
export const getProducts = async ({
    page = 1,
    limit = 10,
    category = '',
    search = '',
    sort = ''
}: ProductFilters): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    const response = await AxiosConfig.get<ProductsResponse>(`/products?${params.toString()}`);
    return response.data;
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product> => {
    const response = await AxiosConfig.get<Product>(`/products/${id}`);
    return response.data;
};

// Create a new product
export const createProduct = async (
    productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt' | 'averageRating'>
): Promise<Product> => {
    const response = await AxiosConfig.post<Product>('/products', productData);
    return response.data;
};

// Update a product
export const updateProduct = async (
    id: string,
    productData: Partial<Product>
): Promise<Product> => {
    const response = await AxiosConfig.put<Product>(`/products/${id}`, productData);
    return response.data;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
    await AxiosConfig.delete(`/products/${id}`);
};

// Add a rating to a product
export const addProductRating = async (
    productId: string,
    userId: string,
    rating: number,
    comment?: string
): Promise<Product> => {
    const response = await AxiosConfig.post<Product>(`/products/${productId}/rate`, {
        userId,
        rating,
        comment,
    });
    return response.data;
};
