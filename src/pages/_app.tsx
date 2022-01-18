import React from 'react';

import type { AppProps } from 'next/app';

import wrapper from '@store/store';
import '@styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
