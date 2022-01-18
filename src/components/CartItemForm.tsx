import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';

import { addToCart } from '@actions/cart';
import { CartItem } from '@models/cart';

const CartItemForm = () => {
  const dispatch = useDispatch();
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
