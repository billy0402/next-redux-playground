import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { asyncMatcher } from '@lib/extraReducers';
import { ApiState } from '@models/api-state';
import { ApiStatus } from '@models/api-status';
import { Book } from '@models/book';
import { apiBookList } from '@services/book';

type BookListState = ApiState<Book[]>;
const initialState: BookListState = {
  data: null,
  error: {
    list: null,
  },
  status: {
    list: ApiStatus.idle,
  },
};

const asyncPrefix = 'book/list';
const bookListAsync = createAsyncThunk(`${asyncPrefix}/list`, async () => {
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
    builder.addCase(bookListAsync.fulfilled, (state, action) => {
      bookListSlice.caseReducers.bookList(state, action);
    }),
      asyncMatcher(builder, asyncPrefix);
  },
});

export default bookListSlice.reducer;
export const { bookList } = bookListSlice.actions;
export { bookListAsync };
