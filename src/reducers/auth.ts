import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadJson, saveJson } from '@lib/local-storage';
import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Token, TokenObtain, TokenRefresh } from '@models/token';
import { apiTokenObtain, apiTokenRefresh } from '@services/auth';

type AuthState = {
  data: Token;
  status: ApiStatus;
};

const initialState: AuthState = {
  data: {} as Token,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    obtainToken: (state, action: PayloadAction<Token>) => {
      state.data = action.payload;
    },
    refreshToken: (state, action: PayloadAction<Token>) => {
      state.data.access = action.payload.access;
    },
    clearToken: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtainTokenAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        authSlice.caseReducers.obtainToken(state, action);
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        authSlice.caseReducers.refreshToken(state, action);
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = ApiStatus.failed;
      });
  },
});

export default authSlice.reducer;
export const { obtainToken, refreshToken, clearToken } = authSlice.actions;
export { refreshTokenAsync, obtainTokenAsync };
