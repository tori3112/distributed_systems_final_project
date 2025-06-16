import apiClient from '../client';

export const accommodationService = {
  // Get all accommodation
  getAllAccommodations: () => apiClient.get('/accoms/'),
  
  // Get a single accommodation by ID
  getAccommodationById: (id) => apiClient.get(`/accoms/${id}`)
};