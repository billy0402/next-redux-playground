import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Publisher } from '@models/publisher';
import { apiPublisherList } from '@services/publisher';

type PublisherListState = {
  data: Publisher[];
  error: Error;
  status: ApiStatus;
};

const initialState: PublisherListState = {
  data: [] as Publisher[],
  error: {} as Error,
  status: ApiStatus.idle,
};

const publisherListAsync = createAsyncThunk('publisher/list', async () => {
  const response = await apiPublisherList();
  return response.data;
});

const publisherListSlice = createSlice({
  name: 'publisherList',
  initialState,
  reducers: {
    publisherList: (state, action: PayloadAction<Publisher[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publisherListAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        publisherListSlice.caseReducers.publisherList(state, action);
      })
      .addMatcher(isPendingAction('publisher/list'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(isRejectedAction('publisher/list'), (state, action: any) => {
        state.error = action.error;
        state.status = ApiStatus.failed;
      });
  },
});

export default publisherListSlice.reducer;
export const { publisherList } = publisherListSlice.actions;
export { publisherListAsync };
