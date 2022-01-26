import { useForm } from 'react-hook-form';

import useAppDispatch from '@hooks/useAppDispatch';
import { CartItem } from '@models/cart';
import { addToCart } from '@reducers/cart';

const CartItemForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<CartItem>();
  const onSubmit = (cartItem: CartItem) => dispatch(addToCart(cartItem));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder='name'
        {...register('name', { required: true })}
      />
      <input
        type='number'
        placeholder='price'
        {...register('price', { required: true })}
      />

      <button type='submit'>Add</button>
    </form>
  );
};

export default CartItemForm;
