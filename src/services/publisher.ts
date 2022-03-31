import { authApiInstance } from './api';

const apiPublisherList = async () => authApiInstance.get(`/publishers`);

export { apiPublisherList };
