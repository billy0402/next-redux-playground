import { NextPage } from 'next';

import { useForm } from 'react-hook-form';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { loadJson } from '@lib/local-storage';
import { toApiStatus } from '@models/api-status';
import { Token, TokenObtain } from '@models/token';
import {
  clearTokenAsync,
  obtainTokenAsync,
  refreshTokenAsync,
} from '@reducers/auth';

const AuthPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const { loading, success, error } = toApiStatus(auth.status);

  const { register, handleSubmit } = useForm<TokenObtain>();

  const obtainToken = async (data: TokenObtain) => {
    dispatch(obtainTokenAsync(data));
  };

  const refreshToken = async () => {
    const token = loadJson<Token>('token');
    if (!token || !token.refresh) return;
    dispatch(refreshTokenAsync({ refresh: token.refresh }));
  };

  const clearToken = () => {
    dispatch(clearTokenAsync());
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
      <pre>{JSON.stringify(auth.data, null, 4)}</pre>
      <pre>{JSON.stringify(loadJson<Token>('token'), null, 4)}</pre>
    </>
  );
};

export default AuthPage;
