import {
  AnyAction,
  applyMiddleware,
  createStore,
  Middleware,
  Store,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { RootState } from '@models/store';
import rootReducer from '@reducers/root';
import initialStore from './initialStore';

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (
  state: RootState = initialStore,
  action: AnyAction,
): RootState => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

const wrapper = createWrapper<Store<RootState>>(initStore);

export default wrapper;
