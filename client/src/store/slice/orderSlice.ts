import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus, PaymentStatus } from '../../types/orderTypes';
import { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } from '../../services/order';

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
};

export const fetchOrdersAsync = createAsyncThunk(
    'orders/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await getAllOrders();
        } catch (error) {
            return rejectWithValue('Failed to fetch orders');
        }
    }
);

export const fetchOrderByIdAsync = createAsyncThunk(
    'orders/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await getOrderById(id);
        } catch (error) {
            return rejectWithValue('Failed to fetch order');
        }
    }
);

export const createOrderAsync = createAsyncThunk(
    'orders/create',
    async (orderData: Partial<Order>, { rejectWithValue }) => {
        try {
            return await createOrder(orderData);
        } catch (error) {
            return rejectWithValue('Failed to create order');
        }
    }
);

export const updateOrderStatusAsync = createAsyncThunk(
    'orders/updateStatus',
    async (
        { id, orderStatus, paymentStatus }:
            { id: string; orderStatus: OrderStatus; paymentStatus?: PaymentStatus },
        { rejectWithValue }
    ) => {
        try {
            return await updateOrderStatus(id, orderStatus, paymentStatus);
        } catch (error) {
            return rejectWithValue('Failed to update order status');
        }
    }
);

export const deleteOrderAsync = createAsyncThunk(
    'orders/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteOrder(id);
            return id;
        } catch (error) {
            return rejectWithValue('Failed to delete order');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all orders
            .addCase(fetchOrdersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrdersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch order by id
            .addCase(fetchOrderByIdAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderByIdAsync.fulfilled, (state, action: PayloadAction<Order>) => {
                state.currentOrder = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrderByIdAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create order
            .addCase(createOrderAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrderAsync.fulfilled, (state, action: PayloadAction<Order>) => {
                state.orders.push(action.payload);
                state.currentOrder = action.payload;
                state.loading = false;
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update order status
            .addCase(updateOrderStatusAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatusAsync.fulfilled, (state, action: PayloadAction<Order>) => {
                const index = state.orders.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
                state.currentOrder = action.payload;
                state.loading = false;
            })
            .addCase(updateOrderStatusAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete order
            .addCase(deleteOrderAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrderAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.orders = state.orders.filter(order => order._id !== action.payload);
                if (state.currentOrder && state.currentOrder._id === action.payload) {
                    state.currentOrder = null;
                }
                state.loading = false;
            })
            .addCase(deleteOrderAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearCurrentOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;