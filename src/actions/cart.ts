import { Dispatch } from 'react';

import { CartAction } from '@constants/cart';
import { Action } from '@models/action';
import { CartItem } from '@models/cart';

const addToCart =
  (cartItem: CartItem) =>
  (dispatch: Dispatch<Action<CartAction.ADD_ITEM, CartItem>>) => {
    dispatch({
      type: CartAction.ADD_ITEM,
      payload: cartItem,
    });
  };

const deleteFromCart =
  (id: string) =>
  (
    dispatch: Dispatch<Action<CartAction.REMOVE_ITEM, Pick<CartItem, 'id'>>>,
  ) => {
    dispatch({
      type: CartAction.REMOVE_ITEM,
      payload: { id },
    });
  };

export { addToCart, deleteFromCart };
