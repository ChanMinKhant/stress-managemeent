import axios from 'axios';

axios.defaults.withCredentials = true;

const apiService = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiService;
