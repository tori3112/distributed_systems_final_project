// client.js - Small modification to your existing file
import axios from 'axios';

const apiClient = axios.create({
  baseURL: `https://${process.env.REACT_APP_REST_URL}/` ,
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
    const response = await axios.get('https://tubbybuddy.westus.cloudapp.azure.com/', {
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