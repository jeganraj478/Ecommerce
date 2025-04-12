export interface Rating {
    user: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    createdBy?: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    subcategory?: string;
    brand?: string;
    stock: number;
    images: string[];
    tags: string[];
    specifications: Map<string, string> | Record<string, string>;
    ratings: Rating[];
    averageRating: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductsResponse {
    products: Product[];
    totalPages: number;
    currentPage: number;
    total: number;
}

// Rating interface
export interface Rating {
    user: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    createdBy?: string;
}

// Product interface
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    subcategory?: string;
    brand?: string;
    stock: number;
    images: string[];
    tags: string[];
    specifications: Map<string, string> | Record<string, string>;
    ratings: Rating[];
    averageRating: number;
    createdAt: Date;
    updatedAt: Date;
}

// Product filters interface for API requests
export interface ProductFilters {
    page?: number;
    limit?: number;
    category?: string;
    subcategory?: string;
    brand?: string;
    tags?: string[];
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
}

// Product create/update data type
export type ProductFormData = Omit<Product, '_id' | 'createdAt' | 'updatedAt' | 'averageRating' | 'ratings'>;

// Product list response from API
export interface ProductsResponse {
    products: Product[];
    total: number;
    currentPage: number;
    totalPages: number;
}

// Rating submission data
export interface RatingSubmission {
    productId: string;
    userId: string;
    rating: number;
    comment?: string;
}

// Tag interface for managing product tags
export interface Tag {
    _id: string;
    name: string;
    count: number; // Number of products using this tag
    createdAt: Date;
}

// Review interface (expanded version of Rating with additional metadata)
export interface Review extends Rating {
    _id: string;
    product: string;
    title?: string;
    helpfulCount: number;
    isVerifiedPurchase: boolean;
    status: 'pending' | 'approved' | 'rejected';
    updatedAt?: Date;
}