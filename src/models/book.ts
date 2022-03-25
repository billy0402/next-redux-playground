import { BaseModel } from './api-model';

type Book = BaseModel & {
  name: string;
  summary: string;
  price: number;
};

export type { Book };
