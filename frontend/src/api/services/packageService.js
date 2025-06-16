import apiClient from '../client';

export const packageService = {
  // Get all products
  getAllPackages: () => apiClient.get('/'),
  
  // Get a single product by ID
  getPackageById: (id) => apiClient.get(`/${id}`)
};