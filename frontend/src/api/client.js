import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_REST_URL}/` ,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Export the original client
export default apiClient;

// Also export a specialized function for the packages endpoint
export const fetchPackages = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_REST_URL}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

// We need a specialised function for transactions cause token
export const fetchWithToken = async (endpoint, token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_REST_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching packages: ', error);
    throw error;
  }
};