import { authApiInstance } from './api';

const apiAuthorList = async () => authApiInstance.get(`/authors`);

export { apiAuthorList };
