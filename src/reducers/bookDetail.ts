import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { asyncMatcher } from '@lib/extraReducers';
import { ApiState } from '@models/api-state';
import { ApiStatus } from '@models/api-status';
import { Book } from '@models/book';
import {
  apiBookCreate,
  apiBookDelete,
  apiBookDetail,
  apiBookUpdate,
} from '@services/book';

type BookDetailState = ApiState<Book>;

const initialState: BookDetailState = {
  data: null,
  error: {
    detail: null,
    create: null,
    update: null,
    delete: null,
  },
  status: {
    detail: ApiStatus.idle,
    create: ApiStatus.idle,
    update: ApiStatus.idle,
    delete: ApiStatus.idle,
  },
};

const asyncPrefix = 'book/detail';
const bookDetailAsync = createAsyncThunk(
  `${asyncPrefix}/detail`,
  async (id: string) => {
    const response = await apiBookDetail(id);
    return response.data;
  },
);
const bookCreateAsync = createAsyncThunk(
  `${asyncPrefix}/create`,
  async (book: Book) => {
    const response = await apiBookCreate(book);
    return response.data;
  },
);
const bookUpdateAsync = createAsyncThunk(
  `${asyncPrefix}/update`,
  async ({ id, book }: { id: string; book: Book }) => {
    const response = await apiBookUpdate(id, book);
    return response.data;
  },
);
const bookDeleteAsync = createAsyncThunk(
  `${asyncPrefix}/delete`,
  async (id: string) => {
    const response = await apiBookDelete(id);
    return response.data;
  },
);

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
        bookDetailSlice.caseReducers.bookDetail(state, action);
      })
      .addCase(bookCreateAsync.fulfilled, (state, action) => {
        bookDetailSlice.caseReducers.bookDetail(state, action);
      })
      .addCase(bookUpdateAsync.fulfilled, (state, action) => {
        bookDetailSlice.caseReducers.bookDetail(state, action);
      })
      .addCase(bookDeleteAsync.fulfilled, (state, action) => {
        bookDetailSlice.caseReducers.bookDetailReset(state);
      }),
      asyncMatcher(builder, asyncPrefix);
  },
});

export default bookDetailSlice.reducer;
export const { bookDetail, bookDetailReset } = bookDetailSlice.actions;
export { bookDetailAsync, bookCreateAsync, bookUpdateAsync, bookDeleteAsync };
