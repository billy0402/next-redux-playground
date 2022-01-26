import { Action } from 'redux';
import { ThunkAction } from '@reduxjs/toolkit';

import { makeStore } from '@store';

type AppStore = ReturnType<typeof makeStore>;
type AppState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type { AppStore, AppDispatch, AppState, AppThunk };
