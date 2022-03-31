import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Book } from '@models/book';
import { apiBookList } from '@services/book';

type BookListState = {
  data: Book[];
  error: Error;
  status: ApiStatus;
};

const initialState: BookListState = {
  data: [] as Book[],
  error: {} as Error,
  status: ApiStatus.idle,
};

const bookListAsync = createAsyncThunk('book/list', async () => {
  const response = await apiBookList();
  return response.data;
});

const bookListSlice = createSlice({
  name: 'bookList',
  initialState,
  reducers: {
    bookList: (state, action: PayloadAction<Book[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookListAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        bookListSlice.caseReducers.bookList(state, action);
      })
      .addMatcher(isPendingAction('book/list'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction('book/list'), (state, action: any) => {
        state.error = action.error;
        state.status = ApiStatus.failed;
      });
  },
});

export default bookListSlice.reducer;
export const { bookList } = bookListSlice.actions;
export { bookListAsync };
