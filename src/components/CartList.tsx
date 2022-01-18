import { useDispatch } from 'react-redux';

import { deleteFromCart } from '@actions/cart';
import { CartAction } from '@constants/cart';
import useAppSelector from '@hooks/useAppSelector';

const CartList = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { items } = cart;

  const onClear = () => dispatch({ type: CartAction.CLEAR_ITEMS });
  const onDelete = (id: string) => dispatch(deleteFromCart(id));

  return (
    <>
      <button type='button' onClick={onClear}>
        Clear
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map(({ id, name, price }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>$ {price}</td>
              <td>
                <button type='button' onClick={() => onDelete(id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CartList;
