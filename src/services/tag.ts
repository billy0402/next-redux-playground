import { authApiInstance } from './api';

const apiTagList = async () => authApiInstance.get(`/tags`);

export { apiTagList };
