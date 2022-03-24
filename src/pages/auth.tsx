import { NextPage } from 'next';

import { useForm } from 'react-hook-form';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { loadJson } from '@lib/local-storage';
import { toApiStatus } from '@models/api-status';
import { Token, TokenObtain } from '@models/token';
import {
  clearToken as clearTokenAction,
  obtainTokenAsync,
  refreshTokenAsync,
} from '@reducers/auth';

const AuthPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth);

  const { loading, success, error } = toApiStatus(token.status);

  const { register, handleSubmit } = useForm<TokenObtain>();

  const obtainToken = async (data: TokenObtain) => {
    dispatch(obtainTokenAsync(data));
  };

  const refreshToken = async () => {
    const token = loadJson<Token>('token');
    dispatch(refreshTokenAsync({ refresh: token.refresh }));
  };

  const clearToken = () => {
    dispatch(clearTokenAction());
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

      {loading && <p>Loading...</p>}
      {error && <p>Something error!!!</p>}
      <pre>{JSON.stringify(token.data, null, 4)}</pre>
    </>
  );
};

export default AuthPage;
