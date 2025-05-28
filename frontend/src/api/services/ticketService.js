import apiClient from '../client';

export const ticketService = {
  // Get all tickets
  getAllTickets: () => apiClient.get('/tickets/'),
  
  // Get a single ticket by ID
  getTicketById: (id) => apiClient.get(`/tickets/${id}`)
};