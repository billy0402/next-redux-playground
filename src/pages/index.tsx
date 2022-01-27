import type { NextPage } from 'next';
import Head from 'next/head';

import CartItemForm from '@components/CartItemForm';
import CartList from '@components/CartList';
import { addToCartAsync } from '@reducers/cart';
import wrapper from '@store';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Document</title>
      </Head>
      <CartItemForm />
      <CartList />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // const { id } = params!;

      await store.dispatch(
        addToCartAsync({
          name: 'test',
          price: 123,
        }),
      );
      console.log('State on server', store.getState().cart.value.items);

      return {
        props: {
          // items,
        },
      };
    },
);

export default Home;
