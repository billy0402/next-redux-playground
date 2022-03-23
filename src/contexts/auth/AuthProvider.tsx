import { useContext, useReducer } from 'react';

import { Token } from '@models/token';

import AuthContext from './AuthContext';
import authReducer, { defaultAuthState } from './authReducer';

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthState);

  const obtainToken = (token: Token) => {
    dispatch({ type: 'OBTAIN', payload: token });
  };

  const refreshToken = (accessToken: string) => {
    dispatch({ type: 'REFRESH', payload: accessToken });
  };

  const clearToken = () => {
    dispatch({ type: 'CLEAR' });
  };

  const authContext = {
    token: state.token,
    obtainToken,
    refreshToken,
    clearToken,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
export { useAuthContext };
