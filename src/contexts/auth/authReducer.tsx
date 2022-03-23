import { Token } from '@models/token';

type ActionType =
  | { type: 'OBTAIN'; payload: Token }
  | { type: 'REFRESH'; payload: string }
  | { type: 'CLEAR' };

const defaultAuthState = {
  token: {} as Token,
};

const authReducer = (state: typeof defaultAuthState, action: ActionType) => {
  switch (action.type) {
    case 'OBTAIN':
      return {
        ...state,
        token: action.payload,
      };
    case 'REFRESH':
      return {
        ...state,
        token: {
          refresh: state.token.refresh,
          access: action.payload,
        },
      };
    case 'CLEAR':
      return defaultAuthState;
    default:
      return defaultAuthState;
  }
};

export default authReducer;
export { defaultAuthState };
