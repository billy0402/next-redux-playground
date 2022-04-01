import { ApiStatus } from './api-status';

type ApiState<T> = {
  data: T | null;
  error: { [key: string]: Error | null };
  status: { [key: string]: ApiStatus };
};

export type { ApiState };
