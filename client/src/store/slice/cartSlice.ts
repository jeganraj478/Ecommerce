import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, AddToCartDTO, RemoveFromCartDTO } from '../../types/cartTypes';
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart } from '../../services/cart';

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

// Async thunks
export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      return response.cart.items;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);


export const addItemToCarttAsync = createAsyncThunk(
  'cart/addItem',
  async (data: AddToCartDTO, { rejectWithValue }) => {
    try {
      const response = await addToCart(data);
      return response.cart.items;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

export const removeItemFromCarttAsync = createAsyncThunk(
  'cart/removeItem',
  async (data: RemoveFromCartDTO, { rejectWithValue }) => {
    try {
      const response = await removeFromCart(data);
      return response.cart.items;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }
);

export const updateItemQuantitytAsync = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await updateQuantity(productId, quantity);
      return response.cart.items;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update item quantity');
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await clearCart();
      return [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Local actions for optimistic updates
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCartAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // addItemToCart
    builder.addCase(addItemToCarttAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCarttAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(addItemToCarttAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // removeItemFromCart
    builder.addCase(removeItemFromCarttAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeItemFromCarttAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(removeItemFromCarttAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // updateItemQuantity
    builder.addCase(updateItemQuantitytAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateItemQuantitytAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(updateItemQuantitytAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // clearCart
    builder.addCase(clearCartAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(clearCartAsync.fulfilled, (state) => {
      state.items = [];
      state.loading = false;
    });
    builder.addCase(clearCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;