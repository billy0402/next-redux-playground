import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'API_URL',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default apiInstance;
