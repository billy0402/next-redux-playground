import axios from 'axios';

const apiInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default apiInstance;
