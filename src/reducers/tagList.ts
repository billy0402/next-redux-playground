import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Tag } from '@models/tag';
import { apiTagList } from '@services/tag';

type TagListState = {
  data: Tag[];
  error: Error;
  status: ApiStatus;
};

const initialState: TagListState = {
  data: [] as Tag[],
  error: {} as Error,
  status: ApiStatus.idle,
};

const tagListAsync = createAsyncThunk('tag/list', async () => {
  const response = await apiTagList();
  return response.data;
});

const tagListSlice = createSlice({
  name: 'tagList',
  initialState,
  reducers: {
    tagList: (state, action: PayloadAction<Tag[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tagListAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        tagListSlice.caseReducers.tagList(state, action);
      })
      .addMatcher(isPendingAction('tag/list'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction('tag/list'), (state, action: any) => {
        state.error = action.error;
        state.status = ApiStatus.failed;
      });
  },
});

export default tagListSlice.reducer;
export const { tagList } = tagListSlice.actions;
export { tagListAsync };
