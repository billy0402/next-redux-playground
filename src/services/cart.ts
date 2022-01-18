import { CartItem } from '@models/cart';
import apiInstance from './api';

const apiCartGetItems = async () => apiInstance.get(`/cart`);
const apiCartAddItem = async (item: CartItem) =>
  apiInstance.post(`/cart/item`, item);
const apiCartRemoveItem = async (id: string) =>
  apiInstance.delete(`/cart/item/${id}`);
const apiCartClearItems = async () => apiInstance.delete(`/cart/item`);

export {
  apiCartGetItems,
  apiCartAddItem,
  apiCartRemoveItem,
  apiCartClearItems,
};
