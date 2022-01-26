import { Dispatch } from 'react';

import { AnyAction } from 'redux';

import { ApiAction } from '@constants/api';
import { CartAction } from '@constants/cart';
import { CartItem } from '@models/cart';
import { AppState } from '@models/store';
import { apiCartAddItem } from '@services/cart';

const addToCart =
  (cartItem: CartItem) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => AppState) => {
    const { cart } = getState();
    console.log(cart);

    dispatch({
      type: ApiAction.API_PENDING,
    });
    try {
      const { data } = await apiCartAddItem({
        ...cartItem,
        id: Math.random().toString(),
      });
      dispatch({
        type: CartAction.ADD_ITEM,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: ApiAction.API_ERROR,
        payload: (e as Error).message,
      });
    }
  };

const deleteFromCart = (id: string) => (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: CartAction.REMOVE_ITEM,
    payload: { id },
  });
};

export { addToCart, deleteFromCart };
