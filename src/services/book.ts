import { authApiInstance } from './api';

const apiBookList = async () => authApiInstance.get(`/books`);
const apiBookDetail = async (id: string) => authApiInstance.get(`/books/${id}`);

export { apiBookList, apiBookDetail };
