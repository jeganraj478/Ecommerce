// client/src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsResponse, ProductFilters } from '../../types/productTypes';
import { getProducts, getProductById, updateProduct, createProduct, deleteProduct, addProductRating } from '../../services/product';

interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
    total: number;
    filters: ProductFilters;
}

const initialState: ProductState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    total: 0,
    filters: {
        page: 1,
        limit: 10,
        category: '',
        search: '',
        sort: '',
    },
};

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters: ProductFilters) => {
        return await getProducts(filters);
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string) => {
        return await getProductById(id);
    }
);

export const createProductAsync = createAsyncThunk(
    'products/createProduct',
    async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt' | 'averageRating'>) => {
        return await createProduct(productData);
    }
);

export const updateProductAsync = createAsyncThunk(
    'products/updateProduct',
    async ({ id, data }: { id: string; data: Partial<Product> }) => {
        return await updateProduct(id, data);
    }
);

export const deleteProductAsync = createAsyncThunk(
    'products/deleteProduct',
    async (id: string) => {
        await deleteProduct(id);
        return id;
    }
);

export const addProductRatingAsync = createAsyncThunk(
    'products/addRating',
    async ({
        productId,
        userId,
        rating,
        comment,
    }: {
        productId: string;
        userId: string;
        rating: number;
        comment?: string;
    }) => {
        return await addProductRating(productId, userId, rating, comment);
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
            state.filters = {
                ...state.filters,
                ...action.payload,
            };
            // Reset to page 1 when filters change (except when page is explicitly set)
            if (!action.payload.page) {
                state.filters.page = 1;
            }
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })

            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch product';
            })

            // Create product
            .addCase(createProductAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.products.unshift(action.payload); // Add to beginning of list
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create product';
            })

            // Update product
            .addCase(updateProductAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                // Update in products list if present
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                // Update current product if it's the one being viewed
                if (state.currentProduct && state.currentProduct._id === action.payload._id) {
                    state.currentProduct = action.payload;
                }
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update product';
            })

            // Delete product
            .addCase(deleteProductAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.products = state.products.filter(p => p._id !== action.payload);
                if (state.currentProduct && state.currentProduct._id === action.payload) {
                    state.currentProduct = null;
                }
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete product';
            })

            // Add rating
            .addCase(addProductRatingAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductRatingAsync.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                // Update in products list if present
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                // Update current product if it's the one being viewed
                if (state.currentProduct && state.currentProduct._id === action.payload._id) {
                    state.currentProduct = action.payload;
                }
            })
            .addCase(addProductRatingAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add rating';
            });
    },
});

export const { setFilters, clearCurrentProduct } = productSlice.actions;

export default productSlice.reducer;
