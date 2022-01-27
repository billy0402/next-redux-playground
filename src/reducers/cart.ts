import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { Cart, CartItem } from '@models/cart';
import { apiCartAddItem } from '@services/cart';

type CartState = {
  value: Cart;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: CartState = {
  value: {
    items: [],
  },
  status: 'idle',
};

const addToCartAsync = createAsyncThunk(
  'cart/addItem',
  async (cartItem: CartItem) => {
    const response = await apiCartAddItem({
      ...cartItem,
      id: Math.random().toString(),
    });
    return response.data;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.value.items = [...state.value.items, action.payload];
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.value.items = state.value.items.filter(
        ({ id }) => id !== action.payload,
      );
    },
    clearCartItems: (state) => {
      state.value.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        cartSlice.caseReducers.addToCart(state, action);
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default cartSlice.reducer;
export const { addToCart, deleteFromCart, clearCartItems } = cartSlice.actions;
export { addToCartAsync };
