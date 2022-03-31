import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Book } from '@models/book';
import { apiBookDetail } from '@services/book';

type BookDetailState = {
  data: Book | null;
  error: Error;
  status: ApiStatus;
};

const initialState: BookDetailState = {
  data: null,
  error: {} as Error,
  status: ApiStatus.idle,
};

const bookDetailAsync = createAsyncThunk('book/detail', async (id: string) => {
  const response = await apiBookDetail(id);
  return response.data;
});

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState,
  reducers: {
    bookDetail: (state, action: PayloadAction<Book>) => {
      state.data = action.payload;
    },
    bookDetailReset: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookDetailAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        bookDetailSlice.caseReducers.bookDetail(state, action);
      })
      .addMatcher(isPendingAction('book/detail'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction('book/detail'), (state, action: any) => {
        state.error = action.error;
        state.status = ApiStatus.failed;
      });
  },
});

export default bookDetailSlice.reducer;
export const { bookDetail, bookDetailReset } = bookDetailSlice.actions;
export { bookDetailAsync };
