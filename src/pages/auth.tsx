import { useState } from 'react';

import { NextPage } from 'next';

import { useForm } from 'react-hook-form';

import { useAuthContext } from '@contexts/auth/AuthProvider';
import { TokenObtain } from '@models/token';
import { apiTokenObtain, apiTokenRefresh } from '@services/auth';

const AuthPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const authContext = useAuthContext();
  const { register, handleSubmit } = useForm<TokenObtain>();

  const obtainToken = async (data: TokenObtain) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiTokenObtain(data);
      const token = response.data;
      authContext.obtainToken(token);
    } catch (error) {
      setError(error as Error);
    }

    setIsLoading(false);
  };

  const refreshToken = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await await apiTokenRefresh({
        refresh: authContext.token.refresh,
      });
      const { access } = response.data;
      authContext.refreshToken(access);
    } catch (error) {
      setError(error as Error);
    }

    setIsLoading(false);
  };

  const clearToken = () => {
    authContext.clearToken();
  };

  return (
    <>
      <form onSubmit={handleSubmit(obtainToken)}>
        <input
          type='text'
          placeholder='username'
          {...register('username', { required: true })}
        />
        <input
          type='number'
          placeholder='password'
          {...register('password', { required: true })}
        />

        <button type='submit'>Login</button>
        <button type='button' onClick={refreshToken}>
          Refresh
        </button>
        <button type='button' onClick={clearToken}>
          Logout
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <pre>{JSON.stringify(authContext.token, null, 4)}</pre>
    </>
  );
};

export default AuthPage;
