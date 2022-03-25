import axios from 'axios';

import { loadJson } from '@lib/local-storage';
import { Token } from '@models/token';

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
  config.headers!['Authorization'] = `Bearer ${token.access}`;
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiInstance;
export { authApiInstance };
