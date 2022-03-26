import axios from 'axios';

import { loadJson, saveJson } from '@lib/local-storage';
import { Token } from '@models/token';

import { apiTokenRefresh } from './auth';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const authApiInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});
authApiInstance.interceptors.request.use((config) => {
  const token = loadJson<Token>('token');
  if (token && token.access) {
    config.headers!['Authorization'] = `Bearer ${token.access}`;
  }
  return config;
});
authApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.config.url !== '/token/refresh/'
      ) {
        const token = loadJson<Token>('token');
        const response = await apiTokenRefresh({ refresh: token.refresh });
        const { access } = response.data;
        await saveJson<Token>('token', { ...token, access });
        return authApiInstance.request(error.config);
      }
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
export { authApiInstance };
