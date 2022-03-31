import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loadJson, removeJson, saveJson } from '@lib/local-storage';
import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Token, TokenObtain, TokenRefresh } from '@models/token';
import { apiTokenObtain, apiTokenRefresh } from '@services/auth';
import { Auth } from '@models/auth';

type AuthState = {
  data: Auth;
  error: Error;
  status: ApiStatus;
};

const initialState: AuthState = {
  data: {
    isLoggedIn: !!loadJson<Token>('token'),
  },
  error: {} as Error,
  status: ApiStatus.idle,
};

const obtainTokenAsync = createAsyncThunk(
  'auth/obtainToken',
  async (data: TokenObtain) => {
    const response = await apiTokenObtain(data);
    saveJson<Token>('token', response.data);
    return response.data;
  },
);

const refreshTokenAsync = createAsyncThunk(
  'auth/refreshToken',
  async (data: TokenRefresh) => {
    const response = await apiTokenRefresh(data);
    const token = loadJson<Token>('token');
    saveJson<Token>('token', { ...token, access: response.data.access });
    return response.data;
  },
);

const clearTokenAsync = createAsyncThunk('auth/clearToken', async () => {
  removeJson('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    obtainToken: (state) => {
      state.data.isLoggedIn = true;
    },
    refreshToken: (state) => {
      state.data.isLoggedIn = true;
    },
    clearToken: (state) => {
      state.data.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtainTokenAsync.fulfilled, (state) => {
        state.status = ApiStatus.idle;
        authSlice.caseReducers.obtainToken(state);
      })
      .addCase(refreshTokenAsync.fulfilled, (state) => {
        state.status = ApiStatus.idle;
        authSlice.caseReducers.refreshToken(state);
      })
      .addCase(clearTokenAsync.fulfilled, (state) => {
        state.status = ApiStatus.idle;
        authSlice.caseReducers.clearToken(state);
      })
      .addMatcher(isPendingAction('auth'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction('auth'), (state, action: any) => {
        state.error = action.error;
        state.status = ApiStatus.failed;
      });
  },
});

export default authSlice.reducer;
export const { obtainToken, refreshToken, clearToken } = authSlice.actions;
export { refreshTokenAsync, obtainTokenAsync, clearTokenAsync };
