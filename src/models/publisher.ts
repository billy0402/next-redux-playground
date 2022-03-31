import { BaseModel } from './api-model';

type Publisher = BaseModel & {
  name: string;
  address: string;
};

export type { Publisher };
