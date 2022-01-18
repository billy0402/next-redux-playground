import { AnyAction } from 'redux';

import { CartAction } from '@constants/cart';
import { Cart } from '@models/cart';

const cartInitialState: Cart = {
  items: [],
};

const cartReducer = (state: Cart = cartInitialState, action: AnyAction) => {
  switch (action.type) {
    case CartAction.GET_ITEMS:
      return {
        ...state,
      };
    case CartAction.ADD_ITEM: {
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, id: Math.random().toString() },
        ],
      };
    }
    case CartAction.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.payload.id),
      };
    case CartAction.CLEAR_ITEMS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
export { cartInitialState };
