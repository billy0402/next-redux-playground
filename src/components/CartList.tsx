import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { clearCartItems, deleteFromCart } from '@reducers/cart';

const CartList = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { status } = cart;
  const { items } = cart.value;

  const onClear = () => dispatch(clearCartItems());
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
          {status === 'loading' && (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          )}
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
