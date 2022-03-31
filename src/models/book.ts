import { BaseModel } from './api-model';

type Book = BaseModel & {
  name: string;
  summary: string;
  price: number;
  authors: number[];
  publisher: number;
  classification: number;
  tags: number[];
};

export type { Book };
