import React from 'react';

import type { AppProps } from 'next/app';

import AuthProvider from '@contexts/auth/AuthProvider';
import wrapper from '@store';
import '@styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default wrapper.withRedux(MyApp);
