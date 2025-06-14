import { useResource } from './useResource';

export function useAllProducts() {
  return useResource('/orders/', {
    transformResponse: (data) => {
      if (data && data._embedded && data._embedded.ticketList) {
        return data._embedded.ticketList;
      }
      console.error('Unexpected API response structure:', data);
      return [];
    }
  });
}
