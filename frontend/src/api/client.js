import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://104.210.36.2:8080/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export default apiClient;