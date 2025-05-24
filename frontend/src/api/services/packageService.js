import apiClient from '../client';

export const productService = {
  // Get all products
  getAllProducts: () => apiClient.get('/'),
  
  // Get a single product by ID
  getProductById: (id) => apiClient.get(`/${id}`)
};