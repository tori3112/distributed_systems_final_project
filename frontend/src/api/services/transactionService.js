import apiClient from '../client';

export const transactionService = {
  // Get all accommodation
  getAllTransactions: () => apiClient.get('/orders/'),
};