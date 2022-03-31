import { authApiInstance } from './api';

const apiClassificationList = async () =>
  authApiInstance.get(`/classifications`);

export { apiClassificationList };
