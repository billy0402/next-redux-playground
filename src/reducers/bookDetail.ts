import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getActionType, isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Book } from '@models/book';
import {
  apiBookCreate,
  apiBookDelete,
  apiBookDetail,
  apiBookUpdate,
} from '@services/book';

type BookDetailState = {
  data: Book | null;
  error: { [key: string]: Error | null };
  status: { [key: string]: ApiStatus };
};

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
        state.status.detail = ApiStatus.idle;
        bookDetailSlice.caseReducers.bookDetail(state, action);
      })
      .addCase(bookCreateAsync.fulfilled, (state, action) => {
        state.status.create = ApiStatus.idle;
        bookDetailSlice.caseReducers.bookDetail(state, action);
      })
      .addCase(bookUpdateAsync.fulfilled, (state, action) => {
        state.status.update = ApiStatus.idle;
        bookDetailSlice.caseReducers.bookDetail(state, action);
      })
      .addCase(bookDeleteAsync.fulfilled, (state, action) => {
        state.status.delete = ApiStatus.idle;
        bookDetailSlice.caseReducers.bookDetailReset(state);
      })
      .addMatcher(isPendingAction(asyncPrefix), (state, action) => {
        const actionType = getActionType(action.type, asyncPrefix);
        state.status[actionType] = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction(asyncPrefix), (state, action: any) => {
        const actionType = getActionType(action.type, asyncPrefix);
        state.status[actionType] = ApiStatus.failed;
        state.error[actionType] = action.error;
      });
  },
});

export default bookDetailSlice.reducer;
export const { bookDetail, bookDetailReset } = bookDetailSlice.actions;
export { bookDetailAsync, bookCreateAsync, bookUpdateAsync, bookDeleteAsync };
