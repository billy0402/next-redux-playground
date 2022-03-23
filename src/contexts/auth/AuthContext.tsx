import { createContext } from 'react';

import { Token } from '@models/token';

type AuthContextProps = {
  token: Token;
  obtainToken: (token: Token) => void;
  refreshToken: (accessToken: string) => void;
  clearToken: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
