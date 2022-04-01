import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '@models/api';
import { ApiState } from '@models/api-state';
import { ApiStatus } from '@models/api-status';

const getActionType = (value: string, prefix: string) =>
  value.substring(prefix.length).split('/')[1];

const asyncMatcher = (
  builder: ActionReducerMapBuilder<ApiState<unknown>>,
  asyncPrefix: string,
) => {
  builder
    .addMatcher(isPendingAction(asyncPrefix), (state, action) => {
      const actionType = getActionType(action.type, asyncPrefix);
      state.status[actionType] = ApiStatus.loading;
    })
    .addMatcher(isFulfilledAction(asyncPrefix), (state, action) => {
      const actionType = getActionType(action.type, asyncPrefix);
      state.status[actionType] = ApiStatus.idle;
    })
    .addMatcher(isRejectedAction(asyncPrefix), (state, action) => {
      const actionType = getActionType(action.type, asyncPrefix);
      state.status[actionType] = ApiStatus.failed;
      state.error[actionType] = action.error as Error;
    });
};

export { asyncMatcher };
