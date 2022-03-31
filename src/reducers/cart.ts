import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Cart, CartItem } from '@models/cart';
import { apiCartAddItem } from '@services/cart';

import hydrate from './hydrate';

type CartState = {
  value: Cart;
  status: ApiStatus;
};

const initialState: CartState = {
  value: {
    items: [],
  },
  status: ApiStatus.idle,
};

const addToCartAsync = createAsyncThunk(
  'cart/addItem',
  async (cartItem: Omit<CartItem, 'id'>) => {
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
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload[cartSlice.name],
        };
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        cartSlice.caseReducers.addToCart(state, action);
      })
      .addMatcher(isPendingAction('cart'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction('cart'), (state, action) => {
        state.status = ApiStatus.failed;
      });
  },
});

export default cartSlice.reducer;
export const { addToCart, deleteFromCart, clearCartItems } = cartSlice.actions;
export { addToCartAsync };
