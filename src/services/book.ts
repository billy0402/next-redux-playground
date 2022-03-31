import { Book } from '@models/book';
import { authApiInstance } from './api';

const apiBookList = async () => authApiInstance.get(`/books`);
const apiBookDetail = async (id: string) => authApiInstance.get(`/books/${id}`);
const apiBookCreate = async (book: Book) =>
  authApiInstance.post(`/books`, book);
const apiBookUpdate = async (id: string, book: Book) =>
  authApiInstance.patch(`/books/${id}`, book);
const apiBookDelete = async (id: string) =>
  authApiInstance.delete(`/books/${id}`);

export {
  apiBookList,
  apiBookDetail,
  apiBookCreate,
  apiBookUpdate,
  apiBookDelete,
};
