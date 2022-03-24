import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { AppStore } from '@models/store';

import authReducer from '@reducers/auth';
import cartReducer from '@reducers/cart';

const makeStore = () =>
  configureStore({
    reducer: { auth: authReducer, cart: cartReducer },
    devTools: process.env.NODE_ENV !== 'production',
  });

const wrapper = createWrapper<AppStore>(makeStore);

export default wrapper;
export { makeStore };
