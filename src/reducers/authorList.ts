import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Author } from '@models/author';
import { apiAuthorList } from '@services/author';

type AuthorListState = {
  data: Author[];
  error: Error;
  status: ApiStatus;
};

const initialState: AuthorListState = {
  data: [] as Author[],
  error: {} as Error,
  status: ApiStatus.idle,
};

const authorListAsync = createAsyncThunk('author/list', async () => {
  const response = await apiAuthorList();
  return response.data;
});

const authorListSlice = createSlice({
  name: 'authorList',
  initialState,
  reducers: {
    authorList: (state, action: PayloadAction<Author[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorListAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        authorListSlice.caseReducers.authorList(state, action);
      })
      .addMatcher(isPendingAction('author/list'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction('author/list'), (state, action: any) => {
        state.error = action.error;
        state.status = ApiStatus.failed;
      });
  },
});

export default authorListSlice.reducer;
export const { authorList } = authorListSlice.actions;
export { authorListAsync };
