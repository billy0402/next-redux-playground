import type { NextPage } from 'next';
import Head from 'next/head';

import CartItemForm from '@components/CartItemForm';
import CartList from '@components/CartList';

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

export default Home;
