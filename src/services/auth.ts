import { TokenObtain, TokenRefresh } from '@models/token';

import { authApiInstance } from './api';

const apiTokenObtain = async (data: TokenObtain) =>
  authApiInstance.post(`/token/`, data);
const apiTokenRefresh = async (data: TokenRefresh) =>
  authApiInstance.post(`/token/refresh/`, data);

export { apiTokenObtain, apiTokenRefresh };
