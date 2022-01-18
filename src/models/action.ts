import { ApiAction } from '@constants/api';

type ActionPending = {
  type: ApiAction.API_PENDING;
};

type ActionSuccess<T, D> = {
  type: T;
  payload: D;
};

type ActionFailed = {
  type: ApiAction.API_ERROR;
  payload: string;
};

type Action<T, D> = ActionPending | ActionSuccess<T, D> | ActionFailed;

export type { Action };
