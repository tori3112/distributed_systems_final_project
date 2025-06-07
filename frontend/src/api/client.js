import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_REST_URL}:8443/` ,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export default apiClient;