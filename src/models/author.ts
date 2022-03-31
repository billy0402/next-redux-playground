import { BaseModel } from './api-model';

type Author = BaseModel & {
  name: string;
  email: string;
};

export type { Author };
