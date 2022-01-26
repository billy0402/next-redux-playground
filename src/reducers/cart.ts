import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cart, CartItem } from '@models/cart';

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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = {
        ...action.payload,
        id: Math.random().toString(),
      };
      state.value.items = [...state.value.items, newItem];
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
});

export default cartSlice.reducer;
export const { addToCart, deleteFromCart, clearCartItems } = cartSlice.actions;
