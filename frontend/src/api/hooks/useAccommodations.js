import { useResource } from './useResource';

export function useAllProducts() {
  return useResource('/accoms/', {
    transformResponse: (data) => {
      if (data && data._embedded && data._embedded.accommodationList) {
        return data._embedded.accommodationList;
      }
      console.error('Unexpected API response structure:', data);
      return [];
    }
  });
}
