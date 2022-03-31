import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '@models/api';
import { ApiStatus } from '@models/api-status';
import { Classification } from '@models/classification';
import { apiClassificationList } from '@services/classification';

type ClassificationListState = {
  data: Classification[];
  error: Error;
  status: ApiStatus;
};

const initialState: ClassificationListState = {
  data: [] as Classification[],
  error: {} as Error,
  status: ApiStatus.idle,
};

const classificationListAsync = createAsyncThunk(
  'classification/list',
  async () => {
    const response = await apiClassificationList();
    return response.data;
  },
);

const classificationListSlice = createSlice({
  name: 'classificationList',
  initialState,
  reducers: {
    classificationList: (state, action: PayloadAction<Classification[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(classificationListAsync.fulfilled, (state, action) => {
        state.status = ApiStatus.idle;
        classificationListSlice.caseReducers.classificationList(state, action);
      })
      .addMatcher(isPendingAction('classification/list'), (state, action) => {
        state.status = ApiStatus.loading;
      })
      .addMatcher(
        isRejectedAction('classification/list'),
        (state, action: any) => {
          state.error = action.error;
          state.status = ApiStatus.failed;
        },
      );
  },
});

export default classificationListSlice.reducer;
export const { classificationList } = classificationListSlice.actions;
export { classificationListAsync };
